import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { config } from '@/config/env';

// Define the error response interface
interface ErrorResponse {
    status: boolean;
    message: string;
    errorMessage: { path: string; message: string }[];
}

// Global error handler function
const handleErrorResponse = (error: any) => {
    if (error.data) return error.data;
    else return 'Something went wrong';
};

// Base query function with error handling
const baseQueryWithErrorHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | ErrorResponse,
    {},
    FetchBaseQueryMeta
> = async (args: any, api: any, extraOptions: any) => {
    const baseQuery = fetchBaseQuery({
        // baseUrl:"../",
        // baseUrl: process.env.NEXT_PUBLIC_API_KEY || "http://localhost:5000",
        baseUrl: config.BASE_URL,
        credentials: 'include',
    });

    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        const errorResponse = handleErrorResponse(result.error);
        return { error: errorResponse };
    }

    return result;
};

// Create the API using createApi
export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['users', 'product', 'category', 'orders', 'reviews', 'settings'],
    endpoints: () => ({}),
});
// Export hooks for usage in functional components
