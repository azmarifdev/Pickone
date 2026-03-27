import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import EmptyCart from './SideCart/EmptyCart';
import CartItem from './SideCart/CartItem';
import CartSummary from './SideCart/CartSummary';
import CartActions from './SideCart/CartActions';
import { useCart } from '@/components/context/CartContext';
type SideCartProps = {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    onOpenChange: (open: boolean) => void;
};
export default function SideCart({ open, onOpenChange }: SideCartProps) {
    const { cartItems, updateQuantity, removeItem, itemCount, cartTotal } = useCart();
    const closeSidebar = () => onOpenChange(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col p-0 bg-gray-50" style={{ height: '100vh' }}>
                {/* Header with enhanced styling */}
                <SheetHeader className="px-5 py-4 bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
                    <SheetTitle asChild>
                        <h2 className="flex items-center text-xl font-semibold text-gray-800">
                            <svg
                                className="w-5 h-5 mr-2 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            Shopping Cart
                            {itemCount > 0 && (
                                <span className="ml-2 bg-blue-100 text-blue-700 text-sm px-2 py-0.5 rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </h2>
                    </SheetTitle>
                </SheetHeader>

                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="flex flex-col flex-1 relative">
                        {/* Scrollable container for cart items */}
                        <div
                            className="flex-1 overflow-y-auto px-5 py-4"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#CBD5E0 #F1F1F1',
                                paddingBottom: '100px' /* Space for checkout button */,
                                maxHeight: 'calc(100vh - 160px)' /* Full height minus header and button space */,
                            }}>
                                {/* Cart Items */}
                                
                            <div className="space-y-4 mb-5">
                                {cartItems?.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        {...item}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                    />
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <CartSummary cartTotal={cartTotal} />
                        </div>

                        {/* Action Buttons - Absolutely positioned at bottom with 5px gap */}
                        <div
                            className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-lg"
                            style={{
                                marginBottom: '5px',
                                boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}>
                            <CartActions onCheckoutComplete={closeSidebar} />
                        </div>
                    </div>
                )}
            </SheetContent>
            <style jsx global>{`
                /* Webkit browsers (Chrome, Safari) */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 5px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #94a3b8;
                    border-radius: 10px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
            `}</style>
        </Sheet>
    );
}
