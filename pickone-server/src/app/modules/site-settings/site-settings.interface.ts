import { Model } from 'mongoose';

export type ISiteSettings = {
   whatsappNumber: string;
   whatsappConfirmMessage: string;
   freeShippingThreshold: number;
   minimumOrderAmount: number;
   enableAnnouncementBar: boolean;
   announcementText: string;
};

export type SiteSettingsModel = Model<ISiteSettings, Record<string, unknown>>;

