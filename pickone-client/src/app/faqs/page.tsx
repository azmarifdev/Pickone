import FAQ from '@/components/pages-components/faqs/Faqs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions - ZysLet',
    description: 'Find answers to common questions about our products, shipping, returns, and more.',
};

const FaqPage = () => {
    return <FAQ />;
};

export default FaqPage;
