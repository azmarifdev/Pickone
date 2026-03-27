'use client';

import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCart } from '@/components/context/CartContext';
import { trackBeginCheckout } from '@/lib/gtm';

interface CartActionsProps {
    onCheckoutComplete?: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({ onCheckoutComplete }) => {
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const { cartItems, cartTotal } = useCart();

    const openCheckoutModal = () => {
        // Track the checkout initiation event in GTM
        if (cartItems.length > 0) {
            trackBeginCheckout(cartItems, cartTotal);
        }
        setIsCheckoutModalOpen(true);
    };

    return (
        <>
            <div className="space-y-3">
                <button
                    onClick={openCheckoutModal}
                    className="block w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-white opacity-10"></span>
                    Checkout Now
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                    <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure Checkout</span>
                    <span className="mx-2">•</span>
                    <span>Cash on Delivery</span>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onCheckoutComplete={onCheckoutComplete}
            />
        </>
    );
};

export default CartActions;
