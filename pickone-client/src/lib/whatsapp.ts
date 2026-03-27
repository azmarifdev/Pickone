import { config } from '@/config/env';
import { SiteSettings } from '@/hooks/useSiteSettings';

export const buildOrderWhatsAppUrl = (orderId: string, settings?: Partial<SiteSettings>) => {
    const normalizedOrderId = String(orderId || '').trim();
    const whatsappNumber = settings?.whatsappNumber || config.WHATSAPP_NUMBER;
    const template = settings?.whatsappConfirmMessage || config.WHATSAPP_CONFIRM_MESSAGE;

    const sanitizedNumber = whatsappNumber.replace(/\D/g, '');

    const message = template.includes('{orderId}')
        ? template.split('{orderId}').join(normalizedOrderId)
        : `${template} ${normalizedOrderId}`;

    return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`;
};
