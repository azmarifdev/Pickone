import React, { useState } from 'react';
import { buildOrderWhatsAppUrl } from '@/lib/whatsapp';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface OrderSuccessProps {
    savingsPercentage: number;
    savings: number;
    hasProduct: boolean;
    orderDetails?: any; // Add order details from API response
    onContinueShopping: () => void;
    onBackToHome: () => void;
    onWhatsAppConfirm: any;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
    savingsPercentage,
    savings,
    hasProduct,
    orderDetails,
    onContinueShopping,
    onBackToHome,
    onWhatsAppConfirm,
}) => {
    const { settings } = useSiteSettings();
    const [isCopied, setIsCopied] = useState(false);
    const orderId = orderDetails?._id || orderDetails?.id || '';

    const copyOrderId = async () => {
        if (!orderId) return;

        try {
            await navigator.clipboard.writeText(orderId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = orderId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleWhatsAppConfirmation = () => {
        if (!orderId) return;

        const whatsAppUrl = buildOrderWhatsAppUrl(orderId, settings);
        onWhatsAppConfirm(whatsAppUrl);
    };

    return (
        <div className="text-center py-5 sm:py-6 px-2 sm:px-3">
            <div className="mb-3">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center ring-4 ring-green-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h3>
            <div className="bg-gradient-to-b from-green-50 to-white p-4 sm:p-5 rounded-xl border border-green-100 mb-4 max-w-md mx-auto shadow-sm">
                <p className="text-gray-700 text-sm mb-1">
                    Thank you for your order. A confirmation SMS will be sent to your phone shortly.
                </p>
                <p className="text-gray-600 text-xs mb-1">
                    Your order will be delivered within 24-48 hours. Please keep your phone on.
                </p>
                {orderDetails && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-green-100 text-left max-h-[42vh] overflow-y-auto">
                        {/* Order ID and Status Section */}
                        <div className="mb-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs font-medium text-gray-700">
                                        Order ID:
                                        <span className="ml-1 font-bold text-green-700">{orderId}</span>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={copyOrderId}
                                        className="text-[10px] px-2 py-1 rounded border border-green-200 text-green-700 hover:bg-green-50 transition-colors">
                                        {isCopied ? 'Copied!' : 'Copy ID'}
                                    </button>
                                </div>
                                <p className="text-xs font-semibold text-gray-800">
                                    Status: <span className="font-medium capitalize">{orderDetails.status}</span>
                                </p>
                            </div>
                        </div>

                        {/* Order Items Section - Show quantities and attributes */}
                        {orderDetails.order_items && orderDetails.order_items.length > 0 && (
                            <div className="mb-2 pb-2 border-b border-gray-100">
                                <h4 className="text-xs font-medium text-gray-700 mb-1">Order Items:</h4>
                                {orderDetails.order_items.map((item: any, index: number) => (
                                    <div key={index} className="mb-1 pl-2 border-l-2 border-green-200">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-medium text-gray-700">{item.product_name}</p>
                                            <p className="text-xs text-gray-600">
                                                <span className="font-medium">{item.quantity}x</span>
                                                {item.price && (
                                                    <span className="ml-1 font-medium">৳{item.price.toFixed(0)}</span>
                                                )}
                                            </p>
                                        </div>
                                        {/* Display product attributes if available */}
                                        {item.attributes && Object.keys(item.attributes).length > 0 && (
                                            <div className="text-xs text-gray-500">
                                                {Object.entries(item.attributes).map(
                                                    ([key, value]: [string, any], i: number) => (
                                                        <span key={i} className="mr-2">
                                                            <span className="italic">{key}:</span>{' '}
                                                            <span className="font-medium">{value}</span>
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Price Breakdown Section - Compact layout */}
                        <div className="mb-2 pb-1 border-b border-gray-100">
                            <div className="grid grid-cols-2 gap-1 text-xs">
                                <p className="text-gray-500">Subtotal:</p>
                                <p className="text-right font-medium">৳{orderDetails.subtotal?.toFixed(0) || '0'}</p>
                                <p className="text-gray-500">Delivery:</p>
                                <p className="text-right font-medium">৳{orderDetails.delivery_charge?.toFixed(0) || '0'}</p>
                                <p className="text-gray-700 font-medium">Total:</p>
                                <p className="text-right font-bold text-green-600">
                                    ৳{orderDetails.total_price?.toFixed(0) || '0'}
                                </p>
                            </div>
                        </div>

                        {/* Customer Details Section - Compact display */}
                        {orderDetails.address && (
                            <div>
                                <h4 className="text-xs font-medium text-gray-700 mb-1">Delivery Info:</h4>
                                <div className="bg-gray-50 p-1 rounded-md border border-gray-100">
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-800 font-medium">{orderDetails.address.name}</p>
                                        <p className="text-xs text-gray-600">
                                            <span className="font-medium">{orderDetails.address.phone}</span>
                                        </p>
                                    </div>
                                    {orderDetails.address.address && (
                                        <p className="text-xs text-gray-600 leading-tight truncate">
                                            {orderDetails.address.address}
                                            {orderDetails.address.area && `, ${orderDetails.address.area}`}
                                            {orderDetails.address.city && `, ${orderDetails.address.city}`}
                                            {orderDetails.address.postal_code && ` - ${orderDetails.address.postal_code}`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-4 max-w-md mx-auto space-y-2.5">
                {orderId && (
                    <button
                        type="button"
                        onClick={handleWhatsAppConfirmation}
                        className="w-full px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                        Confirm on WhatsApp
                    </button>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        onClick={onBackToHome}
                        className="w-full px-4 py-3 bg-white text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
                        Back to Home
                    </button>
                    <button
                        type="button"
                        onClick={onContinueShopping}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                        Continue Shopping
                    </button>
                </div>
            </div>
            {hasProduct && (
                <div className="mt-3 bg-blue-50 p-2.5 rounded-lg max-w-md mx-auto border border-blue-100">
                    <p className="font-medium text-blue-700 text-sm">You saved {savingsPercentage}% on this purchase!</p>
                    <p className="text-xs text-blue-600">Total savings: ৳{savings.toFixed(0)}</p>
                </div>
            )}
        </div>
    );
};

export default OrderSuccess;
