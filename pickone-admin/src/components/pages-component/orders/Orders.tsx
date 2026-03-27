// app/(dashboard)/order/page.tsx
"use client";
import React, {useState, useEffect, useMemo} from "react";
import {
    FiSearch,
    FiShoppingCart,
    FiPackage,
    FiClock,
    FiCheckCircle,
    FiDollarSign,
    FiRefreshCw,
    FiTrendingUp,
} from "react-icons/fi";
import Loader from "@/components/reusable/Loader/Loader";
import {
    useGetOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} from "@/redux/api/orderApi";
import NotFound from "@/components/shared/NotFound";
import Pagination from "@/components/shared/Pagination";
import OrderTable from "./components/OrderTable";
import ConfirmationModal from "./components/ConfirmationModal";
import OrderDetailsModal from "./components/OrderDetailsModal";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";

const Order = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [dateFilter, setDateFilter] = useState<string>("all");
    // const [viewMode, setViewMode] = useState<"grid" | "table">("table");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // RTK Query hooks
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    // State for modals
    const [currentOrder, setCurrentOrder] = useState<any>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{
        type: "status" | "delete";
        orderId: string;
        nextStatus?: "pending" | "processing" | "completed" | "cancelled";
        title: string;
        description: string;
    } | null>(null);

    // Debounce effect for search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Construct query parameters
    let queries = `page=${currentPage}&limit=${itemsPerPage}`;
    if (statusFilter !== "all") queries += `&status=${statusFilter}`;
    if (debouncedSearchTerm) queries += `&search=${debouncedSearchTerm}`;

    // Fetch orders with all data for statistics
    const {
        data: orders,
        isLoading,
        isFetching,
        refetch,
    } = useGetOrdersQuery({query: queries});

    // Fetch all orders for statistics (without pagination)
    const {data: allOrdersData} = useGetOrdersQuery({
        query: "limit=1000", // Get all orders for stats
    });

    // Calculate statistics
    const orderStats = useMemo(() => {
        const allOrders = allOrdersData?.data || [];

        const totalOrders = allOrders.length;
        const totalRevenue = allOrders.reduce(
            (sum: number, order: any) => sum + (order?.total_price || 0),
            0
        );
        const pendingOrders = allOrders.filter(
            (order: any) => order?.status === "pending"
        ).length;
        const processingOrders = allOrders.filter(
            (order: any) => order?.status === "processing"
        ).length;
        const completedOrders = allOrders.filter(
            (order: any) => order?.status === "completed"
        ).length;
        const cancelledOrders = allOrders.filter(
            (order: any) => order?.status === "cancelled"
        ).length;

        // Calculate average order value
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            totalOrders,
            totalRevenue,
            pendingOrders,
            processingOrders,
            completedOrders,
            cancelledOrders,
            avgOrderValue,
        };
    }, [allOrdersData]);

    // Calculate total pages
    useEffect(() => {
        if (orders?.meta?.total) {
            setTotalPages(Math.ceil(orders?.meta.total / itemsPerPage));
        }
    }, [orders?.meta?.total, itemsPerPage]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, debouncedSearchTerm, statusFilter, dateFilter]);

    const handleAction = (
        type: "status" | "delete" | "view",
        order: any,
        nextStatus?: "pending" | "processing" | "completed" | "cancelled"
    ) => {
        if (type === "view") {
            setCurrentOrder(order);
            setIsViewModalOpen(true);
            return;
        }

        if (type === "status") {
            if (!nextStatus || order?.status === nextStatus) return;

            const statusLabel =
                nextStatus === "cancelled"
                    ? "Cancel"
                    : nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);

            setConfirmAction({
                type,
                orderId: order._id,
                nextStatus,
                title: `Update Status to ${statusLabel}`,
                description: `Are you sure you want to change this order status to ${statusLabel}?`,
            });
            setIsConfirmModalOpen(true);
            return;
        }

        let title = "";
        let description = "";

        title = "Delete Order";
        description =
            "Are you sure you want to delete this order? This action cannot be undone.";

        setConfirmAction({type, orderId: order._id, title, description});
        setIsConfirmModalOpen(true);
    };

    const handleConfirmAction = async () => {
        if (!confirmAction) return;

        try {
            switch (confirmAction.type) {
                case "status":
                    if (confirmAction.nextStatus) {
                        await updateOrderStatus({
                            id: confirmAction.orderId,
                            status: confirmAction.nextStatus,
                        }).unwrap();
                    }
                    break;
                case "delete":
                    await deleteOrder(confirmAction.orderId).unwrap();
                    break;
            }
            setIsConfirmModalOpen(false);
            setConfirmAction(null);
        } catch (error) {
            console.error("Action failed:", error);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <FiShoppingCart className="w-5 h-5 text-white" />
                            </div>
                            Order Management
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Manage customer orders, track status, and process
                            fulfillment
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="flex items-center gap-2">
                            <FiRefreshCw className="w-4 h-4" />
                            Refresh
                        </Button>
                        {/* <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2">
                            <FiDownload className="w-4 h-4" />
                            Export
                        </Button> */}
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Orders
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orderStats.totalOrders}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    All time
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FiShoppingCart className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Revenue
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ৳{orderStats.totalRevenue.toLocaleString()}
                                </p>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <FiTrendingUp className="w-3 h-3" />
                                    All time earnings
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FiDollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Pending Orders
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orderStats.pendingOrders}
                                </p>
                                <p className="text-xs text-orange-600 mt-1">
                                    Awaiting approval
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <FiClock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed Orders
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orderStats.completedOrders}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Successfully delivered
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FiCheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="bg-white border-0 shadow-lg mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-col lg:justify-between sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative w-full max-w-md">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by order ID, customer name, phone..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>

                            {/* Status Filter */}
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40 h-10">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="processing">
                                        Processing
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Date Filter */}
                            {/* <Select
                                value={dateFilter}
                                onValueChange={setDateFilter}>
                                <SelectTrigger className="w-40 h-10">
                                    <SelectValue placeholder="Date" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="all">
                                        All Time
                                    </SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="week">
                                        This Week
                                    </SelectItem>
                                    <SelectItem value="month">
                                        This Month
                                    </SelectItem>
                                </SelectContent>
                            </Select> */}
                        </div>

                        {/* View Mode Toggle */}
                        {/* <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">View:</span>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <Button
                                    variant={
                                        viewMode === "table"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("table")}
                                    className="flex items-center gap-1">
                                    <FiList className="w-4 h-4" />
                                    Table
                                </Button>
                                <Button
                                    variant={
                                        viewMode === "grid"
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="flex items-center gap-1">
                                    <FiGrid className="w-4 h-4" />
                                    Grid
                                </Button>
                            </div>
                        </div> */}
                    </div>

                    {/* Active Filters */}
                    {(statusFilter !== "all" ||
                        dateFilter !== "all" ||
                        debouncedSearchTerm) && (
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
                            <span className="text-sm text-gray-600">
                                Active filters:
                            </span>
                            {statusFilter !== "all" && (
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1">
                                    Status: {statusFilter}
                                    <button
                                        onClick={() => setStatusFilter("all")}
                                        className="ml-1 hover:text-red-600">
                                        ×
                                    </button>
                                </Badge>
                            )}
                            {dateFilter !== "all" && (
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1">
                                    Date: {dateFilter}
                                    <button
                                        onClick={() => setDateFilter("all")}
                                        className="ml-1 hover:text-red-600">
                                        ×
                                    </button>
                                </Badge>
                            )}
                            {debouncedSearchTerm && (
                                <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1">
                                    Search: &ldquo;{debouncedSearchTerm}&rdquo;
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="ml-1 hover:text-red-600">
                                        ×
                                    </button>
                                </Badge>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setStatusFilter("all");
                                    setDateFilter("all");
                                    setSearchTerm("");
                                }}
                                className="text-xs">
                                Clear all
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Orders Content */}
            <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                    {isLoading || isFetching ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader />
                        </div>
                    ) : orders?.data?.length === 0 ? (
                        <div className="text-center py-12">
                            <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <NotFound message="No orders found matching your criteria." />
                        </div>
                    ) : (
                        <OrderTable
                            data={orders?.data}
                            handleAction={handleAction}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {orders?.meta?.total > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </div>
            )}

            {/* Order Details Modal */}
            <OrderDetailsModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                order={currentOrder}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                dialogOpen={isConfirmModalOpen}
                setDialogOpen={setIsConfirmModalOpen}
                dialogAction={{
                    title: confirmAction?.title || "",
                    description: confirmAction?.description || "",
                    type:
                        confirmAction?.type === "delete" ? "delete" : "default",
                }}
                handleConfirmAction={handleConfirmAction}
            />
        </div>
    );
};

export default Order;
