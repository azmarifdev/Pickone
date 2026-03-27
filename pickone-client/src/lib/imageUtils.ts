/**
 * Utility functions for handling image URLs
 */

/**
 * Convert relative image URL to absolute URL
 * Handles both relative and absolute URLs
 */
export const getImageUrl = (imageUrl: string | undefined | null): string => {
    // Return empty string for null/undefined
    if (!imageUrl || imageUrl.trim() === '') {
        return '';
    }

    // Get base URL from environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

    const trimmedImageUrl = imageUrl.trim();

    // Clean up URL paths
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    let cleanImageUrl = trimmedImageUrl.startsWith('/') ? trimmedImageUrl : `/${trimmedImageUrl}`;

    // If absolute URL is provided, normalize it to current base domain for local/dev compatibility
    if (trimmedImageUrl.startsWith('http://') || trimmedImageUrl.startsWith('https://')) {
        try {
            const parsedUrl = new URL(imageUrl);
            cleanImageUrl = parsedUrl.pathname;
        } catch {
            return imageUrl;
        }
    }

    // 🔧 FIX: Handle legacy wrong URLs with double /tmp/
    // Replace "server-tmp/tmp/" with "server-tmp/" to fix old database records
    cleanImageUrl = cleanImageUrl.replace('/server-tmp/tmp/', '/server-tmp/');

    // Convert /tmp/* path to /server-tmp/* for public serving
    if (cleanImageUrl.startsWith('/tmp/') && !cleanImageUrl.startsWith('/server-tmp/')) {
        cleanImageUrl = cleanImageUrl.replace('/tmp/', '/server-tmp/');
    }

    // Handle raw filename values from legacy records
    if (!trimmedImageUrl.includes('/') && !trimmedImageUrl.startsWith('http')) {
        cleanImageUrl = `/server-tmp/products/${trimmedImageUrl}`;
    }

    return `${cleanBaseUrl}${cleanImageUrl}`;
};

/**
 * Get image URL with fallback
 */
export const getImageUrlWithFallback = (
    imageUrl: string | undefined | null,
    fallback: string = '/placeholder.jpg',
): string => {
    const processedUrl = getImageUrl(imageUrl);
    return processedUrl || fallback;
};
