import {api} from "./apiSlice";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get orders with filtering, pagination and search
        getOrders: builder.query<any, {query: string}>({
            query: ({query}) => ({
                url: `/api/v1/order/list?${query}`,
            }),
            providesTags: ["orders"],
        }),

        // Update order status
        updateOrderStatus: builder.mutation<
            any,
            {id: string; status: "pending" | "processing" | "completed" | "cancelled"}
        >({
            query: ({id, status}) => ({
                url: `/api/v1/order/status/${id}`,
                method: "PATCH",
                body: {status},
            }),
            invalidatesTags: ["orders"],
        }),

        // Update order status to "processing"
        approveOrder: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/v1/order/approve/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["orders"],
        }),

        // Update order status to "completed"
        completeOrder: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/v1/order/complete/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["orders"],
        }),

        // Update order status to "cancelled"
        cancelOrder: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/v1/order/cancel/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["orders"],
        }),

        // Delete an order
        deleteOrder: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/v1/order/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["orders"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useUpdateOrderStatusMutation,
    useApproveOrderMutation,
    useCompleteOrderMutation,
    useCancelOrderMutation,
    useDeleteOrderMutation,
} = orderApi;
