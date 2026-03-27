'use client';

import useSWR from 'swr';
import { config } from '@/config/env';

export interface SiteSettings {
    whatsappNumber: string;
    whatsappConfirmMessage: string;
    freeShippingThreshold: number;
    minimumOrderAmount: number;
    enableAnnouncementBar: boolean;
    announcementText: string;
}

const defaultSettings: SiteSettings = {
    whatsappNumber: config.WHATSAPP_NUMBER,
    whatsappConfirmMessage: config.WHATSAPP_CONFIRM_MESSAGE,
    freeShippingThreshold: config.FREE_SHIPPING_THRESHOLD,
    minimumOrderAmount: config.MINIMUM_ORDER_AMOUNT,
    enableAnnouncementBar: false,
    announcementText: '',
};

const fetcher = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch site settings');
    }

    return response.json();
};

export const useSiteSettings = () => {
    const { data, error, isLoading } = useSWR(`${config.BASE_URL}/api/v1/site-settings/public`, fetcher, {
        revalidateOnFocus: false,
    });

    return {
        settings: data?.data ? { ...defaultSettings, ...data.data } : defaultSettings,
        isLoading,
        error,
    };
};

