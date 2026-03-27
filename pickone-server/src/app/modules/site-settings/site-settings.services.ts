import { ISiteSettings } from './site-settings.interface';
import { SiteSettings } from './site-settings.model';

const defaultSettingsPayload: ISiteSettings = {
   whatsappNumber: '8801810011145',
   whatsappConfirmMessage:
      'Hi ZysLet, I placed an order. Order ID: {orderId}. Please confirm my order.',
   freeShippingThreshold: 0,
   minimumOrderAmount: 0,
   enableAnnouncementBar: false,
   announcementText: '',
};

const ensureSettings = async (): Promise<ISiteSettings> => {
   let settings = await SiteSettings.findOne();

   if (!settings) {
      settings = await SiteSettings.create(defaultSettingsPayload);
   }

   return settings;
};

const getPublicSettings = async (): Promise<ISiteSettings> => {
   const settings = await ensureSettings();
   return settings;
};

const getAdminSettings = async (): Promise<ISiteSettings> => {
   const settings = await ensureSettings();
   return settings;
};

const updateSettings = async (
   payload: Partial<ISiteSettings>
): Promise<ISiteSettings> => {
   const settings = await SiteSettings.findOneAndUpdate(
      {},
      payload,
      {
         new: true,
         upsert: true,
         setDefaultsOnInsert: true,
      }
   );

   return settings as ISiteSettings;
};

export const SiteSettingsServices = {
   getPublicSettings,
   getAdminSettings,
   updateSettings,
};

