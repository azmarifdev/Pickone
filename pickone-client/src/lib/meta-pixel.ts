// Meta Pixel (Facebook Pixel) utility functions
import { META_PIXEL_DEBUG, initDebugMode } from '@/config/meta-pixel.config';

// Define window.fbq for TypeScript
declare global {
    interface Window {
        fbq: any;
        fbevents?: any;
    }
}

// Initialize Meta Pixel
export function initMetaPixel() {
    if (typeof window !== 'undefined') {
        // Initialize fbq if not already initialized
        if (!window.fbq) {
            // First, set up the queue and properties
            window.fbq = function(...args: unknown[]) {
                if (window.fbq.callMethod) {
                    window.fbq.callMethod(...args);
                } else {
                    window.fbq.queue.push(args);
                }
            };
            
            // Initialize the queue and other properties first
            window.fbq.queue = [];
            window.fbq.callMethod = null;
            window.fbq.loaded = true;
            window.fbq.version = '2.0';
            window.fbq.agent = 'zyslet';
        }

        // Enable debug mode in development
        if (META_PIXEL_DEBUG) {
            initDebugMode();
        }
    }
}

// Track page view
export function pageView() {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
    }
}

// Track user registration
export function trackRegistration(data?: any) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'CompleteRegistration', data);
    }
}

// Track product view
export function trackProductView(product: any) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'ViewContent', {
            content_ids: [product.id || product._id],
            content_name: product.title || product.name,
            content_type: 'product',
            value: calculateProductPrice(product),
            currency: 'BDT',
        });
    }
}

// Track add to cart
export function trackAddToCart(product: any, quantity: number = 1) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'AddToCart', {
            content_ids: [product.id || product._id],
            content_name: product.title || product.name,
            content_type: 'product',
            value: calculateProductPrice(product) * quantity,
            currency: 'BDT',
            contents: [
                {
                    id: product.id || product._id, 
                    quantity: quantity,
                    item_price: calculateProductPrice(product)
                }
            ]
        });
    }
}

// Track initiate checkout
export function trackInitiateCheckout(cartItems: any[], totalValue: number) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        const contentIds = cartItems.map(item => item.id || item._id);
        const contents = cartItems.map(item => ({
            id: item.id || item._id,
            quantity: item.quantity,
            item_price: calculateProductPrice(item)
        }));
        
        window.fbq('track', 'InitiateCheckout', {
            content_ids: contentIds,
            contents: contents,
            value: totalValue,
            currency: 'BDT',
            num_items: cartItems.length
        });
    }
}

// Track purchase completion
export function trackPurchase(orderId: string, totalValue: number, cartItems: any[]) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        const contentIds = cartItems.map(item => item.id || item._id);
        const contents = cartItems.map(item => ({
            id: item.id || item._id,
            quantity: item.quantity,
            item_price: calculateProductPrice(item)
        }));
        
        window.fbq('track', 'Purchase', {
            content_ids: contentIds,
            contents: contents,
            value: totalValue,
            currency: 'BDT',
            num_items: cartItems.length,
            transaction_id: orderId
        });
    }
}

// Track search
export function trackSearch(searchTerm: string) {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Search', {
            search_string: searchTerm
        });
    }
}

// Helper function to calculate price with discount
function calculateProductPrice(product: any): number {
    if (!product) return 0;
    
    const basePrice = typeof product.price === 'number' ? product.price : 0;
    const discount = typeof product.discount === 'number' ? product.discount : 0;
    
    if (discount > 0) {
        return basePrice - (basePrice * discount / 100);
    }
    return basePrice;
}
