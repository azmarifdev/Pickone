'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useCart } from '@/components/context/CartContext';
import CheckoutCartItems from './CheckoutCartItems';
import CheckoutOrderSuccess from './CheckoutOrderSuccess';
import { trackInitiateCheckout, trackPurchase } from '@/lib/meta-pixel';
import { trackBeginCheckout, trackPurchase as trackGTMPurchase } from '@/lib/gtm';
import { config } from '@/config/env';
import { useRouter } from 'next/navigation';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckoutComplete?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discount?: number;
    attribute?: {
        title: string;
        value: string;
    }[];
    is_free_shipping?: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onCheckoutComplete }) => {
    const { cartItems, updateQuantity, cartTotal, removeItem } = useCart();
    const { settings } = useSiteSettings();
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [deliveryArea, setDeliveryArea] = useState('inside_dhaka');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(isOpen);

    // Track checkout initiation when the modal opens
    useEffect(() => {
        if (isOpen && cartItems.length > 0) {
            // Track checkout initiation with both Meta Pixel and GTM
            trackInitiateCheckout(cartItems, cartTotal);
            trackBeginCheckout(cartItems, cartTotal);
        }
    }, [isOpen, cartItems, cartTotal]);

    // console.log(paymentMethod);
    // Define delivery charges based on area
    const deliveryCharges = {
        inside_dhaka: 60,
        outside_dhaka: 120,
    };

    const minimumOrderAmount = Number(settings.minimumOrderAmount || 0);
    const freeShippingThreshold = Number(settings.freeShippingThreshold || 0);

    // Check if any product has free shipping
    const hasFreeShippingProduct = cartItems.some((item) => item?.is_free_shipping);
    const isThresholdFreeShipping = freeShippingThreshold > 0 && cartTotal >= freeShippingThreshold;
    const isBelowMinimumOrder = minimumOrderAmount > 0 && cartTotal < minimumOrderAmount;

    const clearCartItems = useCallback(() => {
        cartItems.forEach((item) => removeItem(item.id));
    }, [cartItems, removeItem]);

    const resetForm = useCallback(() => {
        setPhone('');
        setName('');
        setAddress('');
        setPaymentMethod('cod');
        setDeliveryArea('inside_dhaka');
        setIsSuccess(false);
        setOrderError(null);
        setOrderDetails(null);
    }, []);

    const handleModalClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        if (isSuccess) {
            clearCartItems();
            resetForm();
        }

        onClose();
    }, [clearCartItems, isSuccess, onClose, resetForm]);

    const handleCloseAll = useCallback(() => {
        handleModalClose();
        onCheckoutComplete?.();
    }, [handleModalClose, onCheckoutComplete]);

    const handleBackToHome = useCallback(() => {
        handleCloseAll();
        router.push('/');
    }, [handleCloseAll, router]);

    const handleWhatsAppConfirm = useCallback(
        (whatsAppUrl: string) => {
            handleCloseAll();
            window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
        },
        [handleCloseAll]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setOrderError(null);

        if (minimumOrderAmount > 0 && cartTotal < minimumOrderAmount) {
            setOrderError(`Minimum order amount is ৳${minimumOrderAmount.toFixed(0)}.`);
            setIsProcessing(false);
            return;
        }

        const deliveryCharge = hasFreeShippingProduct || isThresholdFreeShipping ? 0 : deliveryCharges[deliveryArea as keyof typeof deliveryCharges];
        const finalTotal = parseFloat((cartTotal + deliveryCharge).toFixed(0));

        // Prepare order items in the format the API expects
        const orderItems = cartItems.map((item) => {
            // Make sure we have properly formatted attribute array
            let attributeArray: { title: string; value: string }[] = [];

            // Process attributes properly to ensure they're formatted correctly
            if (item.attribute) {
                // Case 1: If attribute is already an array of {title, value} objects
                if (Array.isArray(item.attribute) && item.attribute.length > 0) {
                    attributeArray = item.attribute.map((attr) => {
                        // Make sure each attribute has the right format
                        if (typeof attr === 'object' && attr !== null) {
                            return {
                                title: attr.title || 'Option',
                                value: attr.value || 'Default',
                            };
                        }
                        return { title: 'Option', value: String(attr) };
                    });
                }
                // Case 2: If attribute is an object (not array)
                else if (typeof item.attribute === 'object' && !Array.isArray(item.attribute)) {
                    // Convert object format to array of {title, value}
                    attributeArray = Object.entries(item.attribute).map(([key, val]) => ({
                        title: key,
                        value: typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val),
                    }));
                }
            }

            // If no attributes were found, add a default attribute
            if (attributeArray.length === 0) {
                attributeArray = [
                    {
                        title: 'Default',
                        value: 'Standard',
                    },
                ];
            }

            return {
                productId: item.id, // This should be the MongoDB _id
                quantity: item.quantity,
                price: parseInt(item.price?.toFixed(0)),
                discount_price: parseInt((item.discount || 0).toFixed(0)),
                selling_price: parseInt(item.price?.toFixed(0)),
                subtotal: parseInt((item.price * item.quantity)?.toFixed(0)),
                attribute: attributeArray,
                product_name: item.name, // Add product name for better display in success message
            };
        });

        // Prepare the order data
        const orderData = {
            delivery_charge: parseInt(deliveryCharge.toFixed(0)),
            subtotal: parseInt(cartTotal.toFixed(0)),
            total_price: parseInt(finalTotal.toFixed(0)),
            address: {
                name: name,
                phone: phone,
                address: address,
            },
            order_items: orderItems,
        };

        try {
            // Make the API call to create the order
            const response = await fetch(`${config.BASE_URL}/api/v1/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Calculate total savings and savings percentage for the success message
                const totalOriginalPrice = cartItems.reduce((sum, item) => {
                    const originalPrice = item.discount ? item.price + item.discount : item.price;
                    return sum + originalPrice * item.quantity;
                }, 0);
                const totalSavings = totalOriginalPrice - cartTotal;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                const savingsPercentage = totalOriginalPrice > 0 ? Math.round((totalSavings / totalOriginalPrice) * 100) : 0;

                // Enhance order details with product names for better display
                // console.log(savingsPercentage);
                const enhancedOrderDetails = {
                    ...result.data,
                    order_items: result.data.order_items.map((item: any, index: number) => ({
                        ...item,
                        product_name: orderItems[index].product_name || 'Product',
                    })),
                };

                setOrderDetails(enhancedOrderDetails);
                setIsSuccess(true);

                // Track the purchase event with Meta Pixel
                trackPurchase(result.data._id || result.data.id || 'order-' + Date.now(), finalTotal, cartItems);

                // Track the purchase event with GTM
                trackGTMPurchase(
                    result.data._id || result.data.id || 'order-' + Date.now(),
                    cartItems,
                    finalTotal,
                    parseInt(deliveryCharge.toFixed(0)),
                    0, // Tax amount (set to 0 if not available)
                );

                // Track the purchase event with Facebook Conversion API (server-side)
                import('@/lib/server-tracking').then(({ trackPurchase: trackServerPurchase }) => {
                    trackServerPurchase(result.data._id || result.data.id || 'order-' + Date.now(), finalTotal, cartItems);
                });

                // Close modal after showing success for some time
                closeTimeoutRef.current = setTimeout(() => {
                    handleModalClose();
                }, 30000); // 30 seconds to view success message
            } else {
                setOrderError(result.message || 'Failed to create your order. Please try again.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setOrderError('Network error occurred. Please check your connection and try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
            return;
        }

        setIsVisible(false);
        animationTimeoutRef.current = setTimeout(() => {
            setShouldRender(false);
        }, 220);

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [isOpen]);

    const deliveryCharge = hasFreeShippingProduct || isThresholdFreeShipping ? 0 : deliveryCharges[deliveryArea as keyof typeof deliveryCharges];
    // Calculate cart totals with memoization to prevent recalculations on every render
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { finalTotal, totalItems, totalOriginalPrice, totalSavings, savingsPercentage } = useMemo(() => {
        // Calculate total number of items
        const items = cartItems.reduce((total, item) => total + item.quantity, 0);

        // Calculate original price and savings
        const origPrice = cartItems.reduce((sum, item) => {
            const originalPrice = item.discount ? item.price + item.discount : item.price;
            return sum + originalPrice * item.quantity;
        }, 0);

        const savings = origPrice - cartTotal;
        const savingsPercent = origPrice > 0 ? Math.round((savings / origPrice) * 100) : 0;

        return {
            finalTotal: (cartTotal + deliveryCharge).toFixed(0),
            totalItems: items,
            totalOriginalPrice: origPrice,
            totalSavings: savings,
            savingsPercentage: savingsPercent,
        };
    }, [cartItems, cartTotal, deliveryCharge]);

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-5">
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleModalClose}></div>
            <div
                className={`relative bg-white rounded-3xl border border-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.25)] max-w-xl w-full max-h-[92vh] overflow-y-auto transform transition-all duration-200 ${
                    isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
                }`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CloseButton onClose={handleModalClose} />

                {isSuccess ? (
                    <CheckoutOrderSuccess
                        savingsPercentage={savingsPercentage}
                        savings={totalSavings}
                        hasProduct={true}
                        orderDetails={orderDetails}
                        onContinueShopping={handleCloseAll}
                        onBackToHome={handleBackToHome}
                        onWhatsAppConfirm={handleWhatsAppConfirm}
                    />
                ) : (
                    <div className="px-4 sm:px-5 pt-8 pb-5">
                        {orderError && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-2 mb-3 rounded-md">
                                <p className="text-xs text-red-700">{orderError}</p>
                            </div>
                        )}

                        <h2 className="text-xl font-bold text-gray-800 mb-4">Complete Your Order</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Two-Column Customer Info */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mb-3">
                                <div className="col-span-2 md:col-span-1">
                                    <label
                                        htmlFor="name"
                                        className="flex items-center text-xs font-medium text-gray-700 mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 mr-1 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Your name"
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label
                                        htmlFor="phone"
                                        className="flex items-center text-xs font-medium text-gray-700 mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 mr-1 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Mobile Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="01XXX-XXXXXX"
                                        pattern="01[3-9][0-9]{8}"
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="address"
                                        className="flex items-center text-xs font-medium text-gray-700 mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 mr-1 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Shipping Address
                                    </label>
                                    <textarea
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="Your complete shipping address"
                                        rows={2}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm resize-none"></textarea>
                                </div>
                            </div>

                            {/* Cart Items Section */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-1.5">
                                    <p className="flex items-center text-xs font-medium text-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 mr-1 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="bg-blue-50 px-2 py-0.5 rounded-full text-blue-700 font-medium text-xs">
                                            Order Items ({totalItems})
                                        </span>
                                    </p>
                                </div>
                                <CheckoutCartItems cartItems={cartItems} updateQuantity={updateQuantity} />
                            </div>

                            {/* Delivery & Payment Options in Row Layout */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-1.5">
                                    <p className="flex items-center text-xs font-medium text-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 mr-1 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="bg-blue-50 px-2 py-0.5 rounded-full text-blue-700 font-medium text-xs">
                                            {hasFreeShippingProduct ? 'Shipping & Payment' : 'Choose Delivery & Payment'}
                                        </span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    {/* Delivery Area Options - Hidden when free shipping */}
                                    {hasFreeShippingProduct ? (
                                        <div className="col-span-2 bg-emerald-50 p-3 mb-1 rounded-md border border-emerald-200 shadow-sm">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5 text-white"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-sm text-emerald-700">
                                                            Free Shipping
                                                        </span>
                                                        <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-full ml-2">
                                                            FREE
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-emerald-600">
                                                        Your order contains item(s) eligible for free shipping
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <label
                                                    className={`flex items-center p-2 border rounded-md cursor-pointer shadow-sm transition-all ${
                                                        deliveryArea === 'inside_dhaka'
                                                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 ring-1 ring-blue-500'
                                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}>
                                                    <div
                                                        className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                                            deliveryArea === 'inside_dhaka'
                                                                ? 'bg-blue-500'
                                                                : 'border border-gray-400'
                                                        }`}>
                                                        {deliveryArea === 'inside_dhaka' && (
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="deliveryArea"
                                                        value="inside_dhaka"
                                                        checked={deliveryArea === 'inside_dhaka'}
                                                        onChange={() => setDeliveryArea('inside_dhaka')}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm">Inside Dhaka</span>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs text-blue-600 font-medium">৳60</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>

                                            <div>
                                                <label
                                                    className={`flex items-center p-2 border rounded-md cursor-pointer shadow-sm transition-all ${
                                                        deliveryArea === 'outside_dhaka'
                                                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 ring-1 ring-blue-500'
                                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}>
                                                    <div
                                                        className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                                                            deliveryArea === 'outside_dhaka'
                                                                ? 'bg-blue-500'
                                                                : 'border border-gray-400'
                                                        }`}>
                                                        {deliveryArea === 'outside_dhaka' && (
                                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="deliveryArea"
                                                        value="outside_dhaka"
                                                        checked={deliveryArea === 'outside_dhaka'}
                                                        onChange={() => setDeliveryArea('outside_dhaka')}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm">Outside Dhaka</span>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs text-blue-600 font-medium">৳120</span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </>
                                    )}

                                    {/* Payment Method */}
                                    <div className={`${hasFreeShippingProduct ? 'col-span-2' : 'col-span-2 mt-1'}`}>
                                        <label className="flex items-center p-2 border rounded-md cursor-pointer border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 shadow-sm text-sm">
                                            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <input type="radio" name="paymentMethod" checked={true} className="sr-only" />
                                            <div className="flex-1">
                                                <span className="font-medium">Cash on Delivery</span>
                                                <span className="text-xs text-gray-500 ml-1.5">Pay when you receive</span>
                                            </div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-emerald-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-3 rounded-lg border border-blue-200 mb-3 shadow-inner">
                                <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 mr-1 text-blue-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                    </svg>
                                    ORDER SUMMARY
                                </h3>
                                <div className="flex justify-between text-xs mb-1 pb-1 border-b border-blue-100">
                                    <span className="text-gray-600">
                                        Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}):
                                    </span>
                                    <span className="font-medium">৳{cartTotal.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-xs mb-1 pb-1 border-b border-blue-100">
                                    <span className="text-gray-600">Delivery:</span>
                                    {hasFreeShippingProduct || isThresholdFreeShipping ? (
                                        <span className="font-medium text-emerald-600">Free</span>
                                    ) : (
                                        <span className="font-medium">৳{deliveryCharge.toFixed(0)}</span>
                                    )}
                                </div>
                                {freeShippingThreshold > 0 && !hasFreeShippingProduct && !isThresholdFreeShipping && (
                                    <p className="text-[11px] text-emerald-700 mt-1">
                                        Add ৳{(freeShippingThreshold - cartTotal).toFixed(0)} more for free shipping.
                                    </p>
                                )}
                                {isBelowMinimumOrder && (
                                    <p className="text-[11px] text-red-600 mt-1">
                                        Minimum order amount: ৳{minimumOrderAmount.toFixed(0)}
                                    </p>
                                )}
                                <div className="flex justify-between text-sm font-bold pt-1">
                                    <span>Total:</span>
                                    <span className="text-blue-700">৳{finalTotal}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isProcessing || cartItems.length === 0 || isBelowMinimumOrder}
                                className={`w-full py-2.5 rounded-md text-white font-medium flex items-center justify-center transition-all ${
                                    isProcessing || cartItems.length === 0 || isBelowMinimumOrder
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
                                }`}>
                                {isProcessing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : cartItems.length === 0 ? (
                                    'Your cart is empty'
                                ) : isBelowMinimumOrder ? (
                                    `Minimum order ৳${minimumOrderAmount.toFixed(0)}`
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        Place Order
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-2">
                                By placing an order, you agree to our Terms and Conditions
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => (
    <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white hover:text-white bg-slate-900/35 hover:bg-slate-900/55 rounded-full p-1.5 z-10 transition-all backdrop-blur"
        aria-label="Close modal">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

export default CheckoutModal;
