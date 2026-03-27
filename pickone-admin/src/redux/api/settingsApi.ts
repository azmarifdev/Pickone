import { api } from './apiSlice';

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSiteSettings: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/site-settings',
            }),
            providesTags: ['settings'],
        }),
        updateSiteSettings: builder.mutation<any, any>({
            query: (data) => ({
                url: '/api/v1/site-settings',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['settings'],
        }),
    }),
});

export const { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } = settingsApi;

