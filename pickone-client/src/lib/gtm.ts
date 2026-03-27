// GTM (Google Tag Manager) utility functions
// Define BundleProduct interface locally as it's not exported from ProductBundle
interface BundleProduct {
    id: string;
    name: string;
    price: number;
    discount?: number;
    image: string;
    originalPrice?: number;
    variant?: string;
    attribute?: any;
}

import { GTM_DEBUG, initDebugMode } from '@/config/gtm.config';

// Define window.dataLayer for TypeScript
declare global {
    interface Window {
        dataLayer: any[];
    }
}

// Initialize data layer
export function initDataLayer() {
    window.dataLayer = window.dataLayer || [];

    // Enable debug mode in development
    if (GTM_DEBUG) {
        initDebugMode();
    }
}

// Push event to data layer
export function pushEvent(event: object) {
    if (typeof window !== 'undefined') {
        window.dataLayer.push(event);
    }
}

// Track page view
export function pageView(url?: string, title?: string) {
    const pageData = {
        path: url || (typeof window !== 'undefined' ? window.location.pathname : ''),
        title: title || (typeof document !== 'undefined' ? document.title : ''),
        location: typeof window !== 'undefined' ? window.location.href : '',
    };

    // Both FB and GA4 use same event name: page_view
    pushEvent({
        event: 'page_view',
        page_location: pageData.location,
        page_title: pageData.title,
        page_path: pageData.path,
        page: {
            path: pageData.path,
            title: pageData.title,
            location: pageData.location,
        },
    });
}

// Track user login
export function trackLogin(userId: string, method: string = 'email') {
    pushEvent({
        event: 'login',
        userId,
        loginMethod: method,
    });
}

// Track user signup
export function trackSignup(userId: string, method: string = 'email') {
    pushEvent({
        event: 'sign_up',
        userId,
        signupMethod: method,
    });
}

// Track product view
export function trackProductView(product: any) {
    if (!product) return;

    const productData = {
        item_id: product.id || product._id || '',
        item_name: product.title || product.name || '',
        price: product.price || 0,
        discount: product.discount || 0,
        currency: 'BDT',
        item_category: product.category?.name || product.categoryName || '',
        item_brand: 'ZysLet',
        quantity: 1,
    };

    // GA4 Event: view_item
    pushEvent({
        event: 'view_item',
        ecommerce: {
            currency: 'BDT',
            value: productData.price,
            items: [productData],
        },
        // Additional custom parameters for better tracking
        page_title: productData.item_name,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        content_type: 'product',
    });

    // FB Event: view_content (separate event for Facebook)
    pushEvent({
        event: 'view_content',
        content_type: 'product',
        content_ids: [productData.item_id],
        content_name: productData.item_name,
        content_category: productData.item_category,
        value: productData.price,
        currency: 'BDT',
        // Facebook specific parameters
        ecommerce: {
            items: [productData],
        },
    });
}

// Track add to cart
export function trackAddToCart(product: any, quantity: number) {
    if (!product) return;

    const productData = {
        item_id: product.id || product._id || '',
        item_name: product.title || product.name || '',
        price: product.price || 0,
        currency: 'BDT',
        quantity: quantity || 1,
        discount: product.discount || 0,
        item_category: product.category?.name || product.categoryName || '',
        item_brand: 'ZysLet',
    };

    // GA4 Event: add_to_cart
    pushEvent({
        event: 'add_to_cart',
        ecommerce: {
            currency: 'BDT',
            value: productData.price * productData.quantity,
            items: [productData],
        },
    });

    // FB Event: add_to_cart (separate event for Facebook)
    pushEvent({
        event: 'add_to_cart_fb',
        content_type: 'product',
        content_ids: [productData.item_id],
        content_name: productData.item_name,
        value: productData.price * productData.quantity,
        currency: 'BDT',
        // Facebook specific parameters
        ecommerce: {
            items: [productData],
        },
    });
}

// Track remove from cart
export function trackRemoveFromCart(product: any, quantity: number) {
    pushEvent({
        event: 'remove_from_cart',
        ecommerce: {
            items: [
                {
                    item_id: product.id || product._id,
                    item_name: product.title || product.name,
                    price: product.price,
                    currency: 'BDT',
                    quantity: quantity,
                    item_category: product.category?.name || '',
                },
            ],
        },
    });
}

// Track bundle selection
export function trackBundleSelection(bundleProducts: BundleProduct[], hasFreeShipping: boolean, totalPrice: number) {
    pushEvent({
        event: 'bundle_selection',
        bundleItems: bundleProducts.length,
        hasFreeShipping,
        totalBundlePrice: totalPrice,
        items: bundleProducts.map((product) => ({
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            original_price: product.originalPrice,
            discount: product.discount,
        })),
    });
}

// Track checkout steps
export function trackBeginCheckout(products: any[], totalValue: number) {
    if (!products || products.length === 0) return;

    const items = products.map((product) => ({
        item_id: product.id || product._id || '',
        item_name: product.title || product.name || '',
        price: product.price || 0,
        currency: 'BDT',
        quantity: product.quantity || 1,
        item_category: product.category?.name || product.categoryName || '',
        item_brand: 'ZysLet',
    }));

    // GA4 Event: begin_checkout
    pushEvent({
        event: 'begin_checkout',
        ecommerce: {
            currency: 'BDT',
            value: totalValue || 0,
            items: items,
        },
    });

    // FB Event: InitiateCheckout (separate event for Facebook)
    pushEvent({
        event: 'initiate_checkout',
        content_type: 'product',
        content_ids: items.map((item) => item.item_id),
        value: totalValue || 0,
        currency: 'BDT',
        num_items: items.length,
        ecommerce: {
            items: items,
        },
    });
}

// Track purchase
export function trackPurchase(
    transactionId: string,
    products: any[],
    totalValue: number,
    shipping: number = 0,
    tax: number = 0,
) {
    if (!products || products.length === 0) return;

    const items = products.map((product) => ({
        item_id: product.id || product._id || '',
        item_name: product.title || product.name || '',
        price: product.price || 0,
        currency: 'BDT',
        quantity: product.quantity || 1,
        item_category: product.category?.name || product.categoryName || '',
        item_brand: 'ZysLet',
    }));

    // GA4 Event: purchase
    pushEvent({
        event: 'purchase',
        ecommerce: {
            transaction_id: transactionId || '',
            value: totalValue || 0,
            tax: tax,
            shipping: shipping,
            currency: 'BDT',
            items: items,
        },
    });

    // FB Event: purchase (separate event for Facebook)
    pushEvent({
        event: 'purchase_fb',
        content_type: 'product',
        content_ids: items.map((item) => item.item_id),
        value: totalValue || 0,
        currency: 'BDT',
        num_items: items.length,
        transaction_id: transactionId || '',
        ecommerce: {
            items: items,
        },
    });
}

// Track search
export function trackSearch(searchTerm: string, resultCount: number) {
    pushEvent({
        event: 'search',
        search_term: searchTerm,
        search_results_count: resultCount,
    });
}

// Set user data and properties in data layer
export function setUserData(userData: { userId?: string; userType?: string; email?: string; isLoggedIn: boolean }) {
    pushEvent({
        event: 'set_user_data',
        user_id: userData.userId || null,
        user_type: userData.userType || 'customer',
        user_email: userData.email || null,
        is_logged_in: userData.isLoggedIn,
    });
}

// Track user engagement (custom events)
export function trackEngagement(eventName: string, eventData: Record<string, any> = {}) {
    pushEvent({
        event: eventName,
        ...eventData,
    });
}

// Track add to wishlist
export function trackAddToWishlist(product: any) {
    pushEvent({
        event: 'add_to_wishlist',
        ecommerce: {
            items: [
                {
                    item_id: product.id || product._id,
                    item_name: product.title || product.name,
                    price: product.price,
                    currency: 'BDT',
                    discount: product.discount,
                    item_category: product.category?.name || '',
                },
            ],
        },
    });
}

// Track product clicks (from listings to product page)
export function trackProductClick(product: any, position: number, list: string = 'Product List') {
    pushEvent({
        event: 'select_item',
        ecommerce: {
            item_list_name: list,
            items: [
                {
                    item_id: product.id || product._id,
                    item_name: product.title || product.name,
                    price: product.price,
                    currency: 'BDT',
                    discount: product.discount,
                    item_category: product.category?.name || '',
                    position: position,
                },
            ],
        },
    });
}

// Track user registration completion
export function trackCompleteRegistration(userId?: string, method: string = 'email', userEmail?: string) {
    // GA4 Event: sign_up (standard)
    pushEvent({
        event: 'sign_up',
        user_id: userId || '',
        signup_method: method,
        user_email: userEmail || '',
        event_category: 'engagement',
        event_label: 'user_registration',
    });

    // FB Event: CompleteRegistration (separate event for Facebook)
    pushEvent({
        event: 'complete_registration',
        registration_method: method,
        user_properties: {
            user_id: userId || '',
            signup_method: method,
        },
        content_name: 'Registration',
        value: 0,
        currency: 'BDT',
    });
}

// Track location search/find
export function trackFindLocation(searchTerm?: string, locationData?: { city?: string; country?: string }) {
    // GA4 Event: search (standard)
    pushEvent({
        event: 'search',
        search_term: searchTerm || '',
        location_city: locationData?.city || '',
        location_country: locationData?.country || '',
        content_type: 'location',
        event_category: 'search',
        event_label: 'location_search',
    });

    // FB Event: FindLocation (separate event for Facebook)
    pushEvent({
        event: 'find_location',
        search_query: searchTerm || '',
        location_data: locationData || {},
        content_type: 'location',
        content_name: 'Location Search',
    });
}

// Enhanced debug function for GTM
export function debugDataLayer() {
    if (typeof window !== 'undefined' && window.dataLayer) {
        console.log('🔍 GTM Data Layer Contents:', window.dataLayer);
        console.log('📊 Last 5 Events:', window.dataLayer.slice(-5));

        // Check for undefined values
        const lastEvent = window.dataLayer[window.dataLayer.length - 1];
        if (lastEvent) {
            const undefinedKeys = Object.keys(lastEvent).filter((key) => lastEvent[key] === undefined);
            if (undefinedKeys.length > 0) {
                console.warn('⚠️ Undefined values found in last event:', undefinedKeys);
            } else {
                console.log('✅ No undefined values in last event');
            }
        }
    }
}
