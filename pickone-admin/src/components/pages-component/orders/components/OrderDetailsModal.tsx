'use client';

import type React from 'react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    FiPackage,
    FiMapPin,
    FiUser,
    FiPhone,
    FiDollarSign,
    FiShoppingCart,
    FiShoppingBag,
    FiBox,
    FiCalendar,
    FiClock,
    FiCheck,
    FiX,
    FiTruck,
} from 'react-icons/fi';
import Image from 'next/image';
import { getImageUrl } from '@/lib/imageUtils';

interface Product {
    _id: string;
    title: string;
    slug: string;
    code: string;
    thumbnail: string;
    price: number;
    discount: number;
    attribute?: {
        title: string;
        values: string;
    }[];
}

interface OrderItem {
    _id: string;
    product: Product;
    quantity: number;
    attribute?: {
        title: string;
        value: string;
    }[];
    price: number;
    discount_price: number;
    selling_price: number;
    subtotal: number;
}

interface Address {
    _id: string;
    orderId: string;
    name: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    _id: string;
    orderNo: string;
    delivery_charge: number;
    subtotal: number;
    total_price: number;
    status: string;
    order_items: OrderItem[];
    createdAt: string;
    updatedAt: string;
    address: Address;
}

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'PPPp');
        } catch (error) {
            return dateString;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return {
                    class: 'bg-orange-50 text-orange-700 border-orange-200',
                    icon: <FiClock className="w-3 h-3" />,
                };
            case 'processing':
                return {
                    class: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <FiClock className="w-3 h-3" />,
                };
            case 'completed':
            case 'delivered':
                return {
                    class: 'bg-green-50 text-green-700 border-green-200',
                    icon: <FiCheck className="w-3 h-3" />,
                };
            case 'cancelled':
                return {
                    class: 'bg-red-50 text-red-700 border-red-200',
                    icon: <FiX className="w-3 h-3" />,
                };
            case 'shipped':
                return {
                    class: 'bg-purple-50 text-purple-700 border-purple-200',
                    icon: <FiTruck className="w-3 h-3" />,
                };
            default:
                return {
                    class: 'bg-gray-50 text-gray-700 border-gray-200',
                    icon: <FiClock className="w-3 h-3" />,
                };
        }
    };

    const statusInfo = getStatusColor(order?.status);
    const statusLabel =
        order?.status === "cancelled"
            ? "Cancel"
            : order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-6 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <FiPackage className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold text-gray-900">Order Details</DialogTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                    Order #{order?.orderNo} • {formatDate(order?.createdAt)}
                                </p>
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${statusInfo.class} px-3 py-1.5 flex items-center gap-2 font-medium`}>
                            {statusInfo.icon}
                            {statusLabel}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <FiShoppingCart className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-700">Order Info</p>
                                    <p className="text-lg font-bold text-blue-900">#{order?.orderNo}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <FiDollarSign className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-green-700">Total Amount</p>
                                    <p className="text-lg font-bold text-green-900">{formatCurrency(order?.total_price)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <FiShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-purple-700">Items Count</p>
                                    <p className="text-lg font-bold text-purple-900">{order?.order_items?.length} items</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Order Information */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FiShoppingCart className="w-5 h-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Date Placed</p>
                                        <p className="font-medium text-gray-900">{formatDate(order?.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiClock className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Last Updated</p>
                                        <p className="font-medium text-gray-900">{formatDate(order?.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FiUser className="w-5 h-5 text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FiUser className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Customer Name</p>
                                        <p className="font-medium text-gray-900">{order?.address?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiPhone className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-600">Phone Number</p>
                                        <p className="font-medium text-gray-900">{order?.address?.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FiMapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-600">Delivery Address</p>
                                        <p className="font-medium text-gray-900">{order?.address?.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FiShoppingBag className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Order Items ({order?.order_items?.length})
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {order?.order_items?.map((item) => {
                                return (
                                    <div
                                        key={item?._id}
                                        className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                            <Image
                                                src={getImageUrl(item?.product?.thumbnail) || '/placeholder.svg'}
                                                alt={item?.product?.title}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{item?.product?.title}</h4>
                                                    <p className="text-sm text-gray-600">Code: {item?.product?.code}</p>

                                                    {/* Product Attribute */}
                                                    {item?.attribute && (
                                                        <div className="mt-2">
                                                            <Badge variant="outline" className="text-xs bg-white">
                                                                {item?.attribute?.map((attr, idx) => (
                                                                    <span key={attr?.title}>
                                                                        {attr?.title}: {attr?.value}
                                                                        {idx < (item.attribute?.length || 0) - 1 && ', '}
                                                                    </span>
                                                                ))}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Price Details */}
                                                <div className="text-right min-w-[160px]">
                                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Qty:</span>
                                                                <span className="font-medium">{item?.quantity}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Unit:</span>
                                                                <span>{formatCurrency(item?.price)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Selling:</span>
                                                                <span>{formatCurrency(item?.selling_price)}</span>
                                                            </div>
                                                            {item?.discount_price > 0 && (
                                                                <div className="flex justify-between text-green-600">
                                                                    <span>Discount:</span>
                                                                    <span>-{formatCurrency(item?.discount_price)}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex justify-between pt-2 border-t font-semibold">
                                                                <span>Subtotal:</span>
                                                                <span>{formatCurrency(item?.subtotal)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FiDollarSign className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <FiBox className="w-4 h-4" />
                                    Items Subtotal
                                </span>
                                <span className="font-medium">{formatCurrency(order?.subtotal)}</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <FiPackage className="w-4 h-4" />
                                    Delivery Charge
                                </span>
                                <span className="font-medium">{formatCurrency(order?.delivery_charge)}</span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Grand Total</span>
                                    <span className="text-xl font-bold text-green-600">
                                        {formatCurrency(order?.total_price)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="border-t pt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                        <FiX className="w-4 h-4" />
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsModal;
