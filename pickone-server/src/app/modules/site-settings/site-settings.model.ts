import { Schema, model } from 'mongoose';
import { ISiteSettings, SiteSettingsModel } from './site-settings.interface';

const siteSettingsSchema = new Schema<ISiteSettings, SiteSettingsModel>(
   {
      whatsappNumber: {
         type: String,
         required: true,
         default: '8801810011145',
         trim: true,
      },
      whatsappConfirmMessage: {
         type: String,
         required: true,
         default:
            'Hi ZysLet, I placed an order. Order ID: {orderId}. Please confirm my order.',
         trim: true,
      },
      freeShippingThreshold: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
      },
      minimumOrderAmount: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
      },
      enableAnnouncementBar: {
         type: Boolean,
         required: true,
         default: false,
      },
      announcementText: {
         type: String,
         required: true,
         default: '',
         trim: true,
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

export const SiteSettings = model<ISiteSettings, SiteSettingsModel>(
   'SiteSettings',
   siteSettingsSchema
);

