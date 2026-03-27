/* eslint-disable no-unused-vars */
// components/order/OrderTable.tsx
import React, {useState} from 'react';
import {format} from 'date-fns';
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FiEye, FiTrash2, FiCheck, FiX, FiClock, FiUser, FiPhone, FiMapPin, FiCalendar, FiDollarSign} from 'react-icons/fi';

interface OrderTableProps {
    data: any[];
    handleAction: (
        type: 'status' | 'delete' | 'view',
        order: any,
        nextStatus?: 'pending' | 'processing' | 'completed' | 'cancelled',
    ) => void;
}

const statusOptions: Array<{
    value: 'pending' | 'processing' | 'completed' | 'cancelled';
    label: string;
}> = [
    {value: 'pending', label: 'Pending'},
    {value: 'processing', label: 'Processing'},
    {value: 'completed', label: 'Completed'},
    {value: 'cancelled', label: 'Cancel'},
];

const getReadableStatus = (status: string) => {
    if (status === 'cancelled') return 'Cancel';
    return status.charAt(0).toUpperCase() + status.slice(1);
};

const OrderTable = ({data, handleAction}: OrderTableProps) => {
    const [openStatusMenuId, setOpenStatusMenuId] = useState<string | null>(null);

    const renderStatusBadge = (status: string) => {
        let customClass = '';
        let icon = null;

        switch (status) {
            case 'pending':
                customClass = 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100';
                icon = <FiClock className="w-3 h-3" />;
                break;
            case 'processing':
                customClass = 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
                icon = <FiClock className="w-3 h-3" />;
                break;
            case 'completed':
                customClass = 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
                icon = <FiCheck className="w-3 h-3" />;
                break;
            case 'cancelled':
            case 'returned':
                customClass = 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
                icon = <FiX className="w-3 h-3" />;
                break;
            default:
                customClass = 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
                icon = <FiClock className="w-3 h-3" />;
        }

        return (
            <Badge className={`${customClass} px-3 py-1 flex items-center gap-1.5 w-fit font-medium`}>
                {icon}
                {getReadableStatus(status)}
            </Badge>
        );
    };

    return (
        <div className="rounded-lg border border-gray-200 overflow-visible">
            <Table className="text-sm">
                <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <TableHead className="font-semibold text-gray-700 py-4 px-6">Order Info</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 px-4">Customer Details</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 px-4">Order Date</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 px-4">Amount</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 px-4">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((order: any, index: number) => {
                        const currentStatus = order?.status || 'pending';
                        const menuStatusOptions = statusOptions.filter((statusOption) => statusOption.value !== currentStatus);

                        return (
                            <TableRow
                                key={order?._id}
                                className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0">
                                <TableCell className="py-6 px-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-semibold text-blue-600">#{index + 1}</span>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Order #{order?.orderNo}</div>
                                                <div className="text-xs text-gray-500">ID: {order?._id?.slice(-8)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <FiUser className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{order?.address?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiPhone className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-600">{order?.address?.phone}</span>
                                        </div>
                                        {order?.address?.address && (
                                            <div className="flex items-center gap-2">
                                                <FiMapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-500 max-w-[200px] truncate">{order?.address?.address}</span>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-4">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="w-4 h-4 text-gray-400" />
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-900">
                                                {order?.createdAt && format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {order?.createdAt && format(new Date(order.createdAt), 'hh:mm a')}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-4">
                                    <div className="flex items-center gap-2">
                                        <FiDollarSign className="w-4 h-4 text-gray-400" />
                                        <div className="text-sm">
                                            <div className="font-bold text-gray-900 text-lg">৳{order?.total_price?.toFixed(2)}</div>
                                            <div className="text-xs text-gray-500">Total Amount</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-4">
                                    <Popover
                                        open={openStatusMenuId === order?._id}
                                        onOpenChange={(open) => setOpenStatusMenuId(open ? order?._id : null)}>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/60">
                                                {renderStatusBadge(currentStatus)}
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent align="start" sideOffset={8} className="w-[150px] p-1">
                                            {menuStatusOptions.map((statusOption) => (
                                                <button
                                                    key={statusOption.value}
                                                    type="button"
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        handleAction('status', order, statusOption.value);
                                                        setOpenStatusMenuId(null);
                                                    }}>
                                                    {statusOption.label}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell className="py-6 px-6">
                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 flex items-center gap-1.5 font-medium"
                                            onClick={() => handleAction('view', order)}>
                                            <FiEye className="w-4 h-4" />
                                            View
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5 font-medium"
                                            onClick={() => handleAction('delete', order)}>
                                            <FiTrash2 className="w-4 h-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderTable;
