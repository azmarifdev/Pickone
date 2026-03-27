'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductQuantity from './Modal/ProductQuantity';
import OrderSuccess from './Modal/OrderSuccess';
import { calculatePrice } from '@/lib/calculatePrice';
import { trackPurchase as trackMetaPurchase } from '@/lib/meta-pixel';
import { trackPurchase as trackGTMPurchase } from '@/lib/gtm';
import { trackPurchase as trackServerPurchase } from '@/lib/server-tracking';
import { config } from '@/config/env';
import { getImageUrl } from '@/lib/imageUtils';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
    selectedAttribute?: string;
    selectedAttributes?: Record<string, string>;
    initialQuantity?: number; // Add initialQuantity prop
    hasFreeShipping?: boolean; // Add hasFreeShipping prop for bundle orders
    bundleProducts?: Array<{
        id: string;
        name: string;
        price: number;
        discount?: number;
        image: string;
        originalPrice?: number;
        variant?: string;
        attribute?: any; // API attribute format [{ title, value }]
        attributes?: any; // Could be array, object, or null
        defaultAttributes?: any; // Could be array, object, or null
    }>;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    product,
    selectedAttribute,
    selectedAttributes = {},
    initialQuantity = 1,
    hasFreeShipping = false,
    bundleProducts = [],
}) => {
    const router = useRouter();
    const { settings } = useSiteSettings();
    const [quantity, setQuantity] = useState(initialQuantity);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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

    // Update quantity when initialQuantity prop changes
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    // For backward compatibility - combine selectedAttribute with selectedAttributes
    const allSelectedAttributes = selectedAttribute
        ? { ...selectedAttributes, [product.attribute?.title || 'Option']: selectedAttribute }
        : selectedAttributes;

    // Define delivery charges based on area
    const deliveryCharges = {
        inside_dhaka: 60,
        outside_dhaka: 120,
    };

    const { originalPrice, salePrice } = calculatePrice(product.price || 0, product.discount || 0);

    // Calculate bundle products total if there are any
    const bundleTotal = bundleProducts?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;
    const minimumOrderAmount = Number(settings.minimumOrderAmount || 0);
    const freeShippingThreshold = Number(settings.freeShippingThreshold || 0);

    // Handle quantity change and recalculate all prices
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    };

    const resetForm = useCallback(() => {
        setQuantity(1);
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
            resetForm();
        }

        onClose();
    }, [isSuccess, onClose, resetForm]);

    const handleContinueShopping = useCallback(() => {
        handleModalClose();
    }, [handleModalClose]);

    const handleBackToHome = useCallback(() => {
        handleModalClose();
        router.push('/');
    }, [handleModalClose, router]);

    const handleWhatsAppConfirm = useCallback(
        (whatsAppUrl: string) => {
            handleModalClose();
            window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
        },
        [handleModalClose]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setIsProcessing(true);
        setOrderError(null);

        // Calculate pricing information
        const productSubtotal = parseFloat((salePrice * quantity).toFixed(0));
        const bundleSubtotal = bundleTotal;
        const combinedSubtotal = productSubtotal + bundleSubtotal;
        const isThresholdFreeShipping =
            freeShippingThreshold > 0 && combinedSubtotal >= freeShippingThreshold;

        if (minimumOrderAmount > 0 && combinedSubtotal < minimumOrderAmount) {
            setOrderError(`Minimum order amount is ৳${minimumOrderAmount.toFixed(0)}.`);
            setIsProcessing(false);
            return;
        }

        // Use the same free shipping logic that we're using for display
        // This ensures consistent behavior between what's shown to users and what's sent to the server
        // When ordering via "Buy Now" without bundles, normal delivery charges apply
        // When ordering via "Buy with Bundle" or if the product itself has free shipping, free shipping applies
        const freeShippingApplies =
            product?.is_free_shipping ||
            (hasFreeShipping && bundleProducts && bundleProducts.length > 0) ||
            (bundleProducts && bundleProducts.length > 0) ||
            isThresholdFreeShipping;

        const orderDeliveryCharge = freeShippingApplies ? 0 : deliveryCharges[deliveryArea as keyof typeof deliveryCharges];
        const totalPrice = parseFloat((combinedSubtotal + orderDeliveryCharge).toFixed(0));

        // Get the selected attribute string for sending to API
        const attributeArray = Object.entries(allSelectedAttributes || {}).map(([title, value]) => ({
            title,
            value,
        }));

        // Prepare order items array starting with the main product
        const orderItems = [
            {
                productId: product._id,
                quantity: quantity,
                attribute: attributeArray,
                price: parseInt(salePrice.toFixed(0)),
                discount_price: parseInt((originalPrice - salePrice).toFixed(0)),
                selling_price: parseInt(salePrice.toFixed(0)),
                subtotal: parseInt((salePrice * quantity).toFixed(0)),
                total_price: parseInt((salePrice * quantity).toFixed(0)),
            },
        ];

        // Add bundle products to order items if there are any
        if (bundleProducts && bundleProducts.length > 0) {
            bundleProducts.forEach((item) => {
                const itemDiscount =
                    item.originalPrice && item.originalPrice > item.price ? item.originalPrice - item.price : 0;

                // Create appropriate attributes for bundle items
                const bundleItemAttributes: { title: string; value: string }[] = [];

                // Process attributes from the product's attributes property if it exists
                // We will only take the first attribute that we find
                if (item.attribute && Array.isArray(item.attribute) && item.attribute.length > 0) {
                    // This is the recommended structure from your example - using the first attribute
                    const firstAttribute = item.attribute?.[0];
                    if (firstAttribute?.title && firstAttribute?.value) {
                        bundleItemAttributes.push({
                            title: firstAttribute.title,
                            value: firstAttribute.value,
                        });
                    }
                }
                // If attribute wasn't found or wasn't valid, check other possible structures
                else if (bundleItemAttributes.length === 0) {
                    // Check if attributes is an array from API response
                    if (item.attributes && Array.isArray(item.attributes) && item.attributes.length > 0) {
                        const firstAttribute = item.attributes?.[0];
                        if (firstAttribute?.title && firstAttribute?.value) {
                            bundleItemAttributes.push({
                                title: firstAttribute.title,
                                value: firstAttribute.value,
                            });
                        }
                    }
                    // Check if defaultAttributes exists and is an array
                    else if (
                        item.defaultAttributes &&
                        Array.isArray(item.defaultAttributes) &&
                        item.defaultAttributes.length > 0
                    ) {
                        const firstAttribute = item.defaultAttributes?.[0];
                        if (firstAttribute?.title && firstAttribute?.value) {
                            bundleItemAttributes.push({
                                title: firstAttribute.title,
                                value: firstAttribute.value,
                            });
                        }
                    }
                    // Check if attributes is an object (from local state format)
                    else if (item.attributes && typeof item.attributes === 'object' && !Array.isArray(item.attributes)) {
                        const entries = Object.entries(item.attributes);
                        if (entries.length > 0) {
                            const [key, value] = entries[0];
                            bundleItemAttributes.push({
                                title: key,
                                value: typeof value === 'object' ? JSON.stringify(value) : String(value),
                            });
                        }
                    }
                    // Check if defaultAttributes is an object
                    else if (
                        item.defaultAttributes &&
                        typeof item.defaultAttributes === 'object' &&
                        !Array.isArray(item.defaultAttributes)
                    ) {
                        const entries = Object.entries(item.defaultAttributes);
                        if (entries.length > 0) {
                            const [key, value] = entries[0];
                            bundleItemAttributes.push({
                                title: key,
                                value: typeof value === 'object' ? JSON.stringify(value) : String(value),
                            });
                        }
                    }
                }

                // If the bundle product has a variant, add it as an attribute
                if (item.variant && !bundleItemAttributes.some((attr) => attr.title === 'Variant')) {
                    bundleItemAttributes.push({
                        title: 'Variant',
                        value: item.variant,
                    });
                }

                // Don't add any default attributes if none were found
                // We will let the API handle default attributes on the server side

                orderItems.push({
                    productId: item.id, // Using id for bundle products
                    quantity: 1, // Default quantity for bundle items
                    attribute: bundleItemAttributes, // Add variant as attribute if available, or default attribute
                    price: parseInt((item.price || 0).toFixed(0)),
                    discount_price: parseInt((itemDiscount || 0).toFixed(0)),
                    selling_price: parseInt((item.price || 0).toFixed(0)),
                    subtotal: parseInt((item.price || 0).toFixed(0)),
                    total_price: parseInt((item.price || 0).toFixed(0)),
                });
            });
        }

        // Prepare order data for the API
        const orderData = {
            delivery_charge: parseInt(orderDeliveryCharge.toFixed(0)),
            subtotal: parseInt(combinedSubtotal.toFixed(0)),
            total_price: parseInt(totalPrice.toFixed(0)),
            address: {
                name: name,
                phone: phone,
                address: address,
            },
            order_items: orderItems,
        };

        try {
            const response = await fetch(`${config.BASE_URL}/api/v1/order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSuccess(true);
                setOrderDetails(result.data);

                // --- TRACKING EVENTS ---
                try {
                    const orderId = result.data?._id || result.data?.orderId || result.data?.id;
                    const totalValue = result.data?.total_price || totalPrice;
                    const cartItems = result.data?.order_items || orderItems;
                    const shipping = result.data?.delivery_charge || orderDeliveryCharge;
                    const tax = 0; // If you have tax info, use it

                    // Fire Meta Pixel
                    trackMetaPurchase(orderId, totalValue, cartItems);
                    // Fire GTM
                    trackGTMPurchase(orderId, cartItems, totalValue, shipping, tax);
                    // Fire server-side Conversion API
                    trackServerPurchase(orderId, totalValue, cartItems);
                } catch (err) {
                    console.error('Tracking error:', err);
                }
                // --- END TRACKING EVENTS ---

                // Reset form after 30 seconds of showing success message
                closeTimeoutRef.current = setTimeout(() => {
                    handleModalClose();
                }, 30000);
            } else {
                setOrderError(result.message || 'Failed to create order. Please try again.');
                console.error('Order creation failed:', result);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setOrderError('An error occurred while creating your order. Please try again later.');
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

    // Calculate subtotal and savings based on quantity
    const productSubtotal = salePrice * quantity || 0;
    const productOriginalPrice = originalPrice * quantity || 0;

    // Check if product has free shipping
    // Free shipping should apply if:
    // 1. Product has free shipping by default, OR
    // 2. The hasFreeShipping prop is true (specifically for bundle order), OR
    // 3. There are actual bundle products in the order
    const isFreeShipping =
        product?.is_free_shipping ||
        (hasFreeShipping && bundleProducts && bundleProducts.length > 0) ||
        (bundleProducts && bundleProducts.length > 0) ||
        (freeShippingThreshold > 0 && productSubtotal + bundleTotal >= freeShippingThreshold);

    const isBelowMinimumOrder =
        minimumOrderAmount > 0 && productSubtotal + bundleTotal < minimumOrderAmount;

    // Calculate delivery charge (0 if free shipping)
    const deliveryCharge = isFreeShipping ? 0 : deliveryCharges[deliveryArea as keyof typeof deliveryCharges];

    // Format prices for display - these will automatically update when quantity or delivery area changes
    const totalPrice = productSubtotal?.toFixed(0);
    // Calculate final total based on whether free shipping applies
    const finalTotal = isFreeShipping
        ? (productSubtotal + bundleTotal).toFixed(0)
        : (productSubtotal + deliveryCharge).toFixed(0);

    // Calculate savings percentage and amount - these will automatically update when quantity changes
    const savings = productOriginalPrice - productSubtotal;
    const savingsPercentage = productOriginalPrice > 0 ? Math.round((savings / productOriginalPrice) * 100) : 0;

    // Check if product has discount
    const hasDiscount = product?.discount && product.discount > 0;

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4 sm:px-5">
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleModalClose}></div>
            <div
                className={`relative bg-white rounded-3xl border border-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.25)] max-w-md w-full max-h-[92vh] overflow-hidden flex flex-col transform transition-all duration-200 ${
                    isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
                }`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CloseButton onClose={handleModalClose} />

                {isSuccess ? (
                    <OrderSuccess
                        savingsPercentage={savingsPercentage}
                        savings={savings}
                        hasProduct={!!product}
                        orderDetails={orderDetails}
                        onContinueShopping={handleContinueShopping}
                        onBackToHome={handleBackToHome}
                        onWhatsAppConfirm={handleWhatsAppConfirm}
                    />
                ) : (
                    <div className="px-4 sm:px-5 pt-7 pb-5 overflow-y-auto custom-scrollbar">
                        {orderError && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-2 mb-3 rounded-md">
                                <p className="text-xs text-red-700">{orderError}</p>
                            </div>
                        )}

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
                            {/* Main Product Card */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-blue-100 mb-3 shadow-sm">
                                <div className="flex items-center">
                                    <div className="relative h-16 w-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                                        <Image
                                            src={getImageUrl(product?.thumbnail)}
                                            alt={product?.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <h3 className="font-medium text-sm line-clamp-1 text-gray-800">{product.title}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-blue-600 font-bold text-sm">৳{salePrice?.toFixed(0)}</p>
                                            {hasDiscount && (
                                                <p className="text-gray-500 line-through text-xs">
                                                    ৳{originalPrice?.toFixed(0)}
                                                </p>
                                            )}
                                            {hasDiscount && (
                                                <span className="bg-rose-100 text-rose-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                    {savingsPercentage}% OFF
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex flex-wrap gap-1">
                                                {/* Display selected attributes from the allSelectedAttributes object */}
                                                {Object.entries(allSelectedAttributes).length > 0 &&
                                                    Object.entries(allSelectedAttributes).map(([attrTitle, attrValue]) => (
                                                        <span
                                                            key={attrTitle}
                                                            className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                            {`${attrTitle}: ${attrValue}`}
                                                        </span>
                                                    ))}

                                                {/* Free shipping Tag */}
                                                {/* {isFreeShipping && (
                                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                        Free Shipping
                                                    </span>
                                                )} */}
                                            </div>
                                            <ProductQuantity quantity={quantity} onQuantityChange={handleQuantityChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Display bundle products if any - Styled like main product */}
                            {bundleProducts.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5 mr-1 text-blue-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                            </svg>
                                            <span className="text-xs font-medium text-gray-700">Bundle Products</span>
                                        </div>
                                        <span className="text-xs text-blue-600 font-medium">
                                            {bundleProducts.length} {bundleProducts.length === 1 ? 'item' : 'items'} · ৳
                                            {bundleProducts.reduce((sum, item) => sum + item.price, 0).toFixed(0)}
                                        </span>
                                    </div>

                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm max-h-40 overflow-y-auto custom-scrollbar">
                                        {bundleProducts.map((bundleProduct, index) => (
                                            <div
                                                key={bundleProduct.id}
                                                className={`flex items-center ${
                                                    index > 0 ? 'mt-2 pt-2 border-t border-blue-50' : ''
                                                }`}>
                                                <div className="relative h-12 w-12 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                                                    <Image
                                                        src={getImageUrl(bundleProduct?.image)}
                                                        alt={bundleProduct?.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {bundleProduct.discount && bundleProduct.discount > 0 && (
                                                        <div className="absolute top-0 right-0 w-full bg-rose-500 text-white text-[8px] font-bold text-center">
                                                            -{bundleProduct.discount}%
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="font-medium text-xs line-clamp-1 text-gray-800">
                                                        {bundleProduct.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-blue-600 font-bold text-xs">
                                                            ৳{bundleProduct.price?.toFixed(0)}
                                                        </p>
                                                        {bundleProduct.originalPrice &&
                                                            bundleProduct.originalPrice > bundleProduct.price && (
                                                                <p className="text-gray-500 line-through text-[10px]">
                                                                    ৳{bundleProduct.originalPrice?.toFixed(0)}
                                                                </p>
                                                            )}
                                                        {bundleProduct.variant && (
                                                            <span className="bg-gray-100 text-gray-600 text-[9px] px-1 py-0.5 rounded-full">
                                                                {bundleProduct.variant}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {bundleProducts.reduce(
                                            (sum, item) => sum + ((item.originalPrice || item.price) - item.price),
                                            0,
                                        ) > 0 && (
                                            <div className="mt-2 pt-2 border-t border-blue-100 flex justify-between items-center">
                                                <div className="text-xs text-gray-600">Total savings:</div>
                                                <div className="bg-rose-100 text-rose-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
                                                    Save ৳
                                                    {bundleProducts
                                                        .reduce(
                                                            (sum, item) =>
                                                                sum + ((item.originalPrice || item.price) - item.price),
                                                            0,
                                                        )
                                                        .toFixed(0)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

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
                                            {isFreeShipping ? 'Free Shipping & Payment' : 'Choose Delivery & Payment'}
                                        </span>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    {/* Delivery Area Options - Hidden when free shipping */}
                                    {isFreeShipping ? (
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
                                                        {bundleProducts && bundleProducts.length > 0
                                                            ? 'Free shipping included with your bundle order'
                                                            : product?.is_free_shipping
                                                            ? 'This product ships free to your location'
                                                            : 'Free shipping applied to your order'}
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
                                    <div className={`${isFreeShipping ? 'col-span-2' : 'col-span-2 mt-1'}`}>
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
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
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
                                        Main Product ({quantity} item{quantity > 1 ? 's' : ''}):
                                    </span>
                                    <span className="font-medium">৳{parseFloat(totalPrice).toFixed(0)}</span>
                                </div>

                                {/* Show bundle products if there are any */}
                                {bundleProducts && bundleProducts.length > 0 && (
                                    <div className="flex justify-between text-xs mb-1 pb-1 border-b border-blue-100">
                                        <span className="text-gray-600">
                                            Bundle Products ({bundleProducts.length} item
                                            {bundleProducts.length > 1 ? 's' : ''}):
                                        </span>
                                        <span className="font-medium">৳{bundleTotal.toFixed(0)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-xs mb-1 pb-1 border-b border-blue-100">
                                    <span className="text-gray-600">Delivery:</span>
                                    {isFreeShipping ? (
                                        <span className="font-medium text-emerald-600">Free</span>
                                    ) : (
                                        <span className="font-medium">৳{deliveryCharge.toFixed(0)}</span>
                                    )}
                                </div>
                                {freeShippingThreshold > 0 && !isFreeShipping && (
                                    <p className="text-[11px] text-emerald-700 mt-1">
                                        Add ৳{(freeShippingThreshold - (productSubtotal + bundleTotal)).toFixed(0)} more for free shipping.
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
                                disabled={isProcessing || isBelowMinimumOrder}
                                className={`w-full py-2.5 rounded-md text-white font-medium flex items-center justify-center transition-all ${
                                    isProcessing || isBelowMinimumOrder
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
                                        Place Order Now
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

export default Modal;
