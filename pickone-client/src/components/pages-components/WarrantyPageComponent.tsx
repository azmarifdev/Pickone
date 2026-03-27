import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import WarrantyContent from '@/components/pages-components/WarrantyPageComponent';

// Import StaticPageClient dynamically to avoid SSR issues with useSearchParams
const StaticPageClient = dynamic(() => import('@/components/client/StaticPageClient'), { ssr: false });

export const metadata: Metadata = {
    title: 'Warranty Information - ZysLet',
    description:
        'Learn about our product warranties, coverage policies, and how to make warranty claims for your ZysLet solar lighting products.',
};

export default function WarrantyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StaticPageClient>
                <WarrantyContent />
            </StaticPageClient>
        </Suspense>
    );
}
