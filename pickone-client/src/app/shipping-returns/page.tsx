import { Metadata } from 'next';
import { Suspense } from 'react';
import StaticPageClient from '@/components/client/StaticPageClient';
// Fix the import path to use relative path instead of alias
import ShippingReturnsContent from '../../components/pages-components/ShippingReturnsContent';

export const metadata: Metadata = {
    title: 'Shipping & Returns Policy - ZysLet',
    description: 'Learn about our shipping methods, delivery times, and return policy for ZysLet products.',
};

export default function ShippingReturnsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StaticPageClient>
                <ShippingReturnsContent />
            </StaticPageClient>
        </Suspense>
    );
}
