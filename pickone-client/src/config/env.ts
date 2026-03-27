export const config = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000",
    WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801810011145',
    WHATSAPP_CONFIRM_MESSAGE:
        process.env.NEXT_PUBLIC_WHATSAPP_CONFIRM_MESSAGE ||
        'Hi ZysLet, I placed an order. Order ID: {orderId}. Please confirm my order.',
    FREE_SHIPPING_THRESHOLD: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD || 0),
    MINIMUM_ORDER_AMOUNT: Number(process.env.NEXT_PUBLIC_MINIMUM_ORDER_AMOUNT || 0),
};
