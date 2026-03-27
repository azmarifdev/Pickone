import { z } from 'zod';

const updateSiteSettingsZodSchema = z.object({
   body: z.object({
      whatsappNumber: z.string().min(8).optional(),
      whatsappConfirmMessage: z.string().min(5).optional(),
      freeShippingThreshold: z.number().min(0).optional(),
      minimumOrderAmount: z.number().min(0).optional(),
      enableAnnouncementBar: z.boolean().optional(),
      announcementText: z.string().optional(),
   }),
});

export const SiteSettingsValidation = {
   updateSiteSettingsZodSchema,
};

