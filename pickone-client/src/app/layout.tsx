import localFont from 'next/font/local';
import './globals.css';
import { ReactNode } from 'react';
import Footer from '@/components/shared/footer';
import { CartProvider } from '@/components/context/CartContext';
import { ToastProvider } from '@/components/ui/toast';
import { CartAnimationProvider } from '@/components/ui/CartAnimation/CartAnimationProvider';
import NavbarWithSuspense from '@/components/client/NavbarWithSuspense';
import GoogleTagManager from '@/components/shared/GoogleTagManager';
import MetaPixel from '@/components/shared/MetaPixel';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata = {
    title: 'ZysLet - Premium Shopping Experience',
    description: 'Discover quality products with an enhanced shopping experience at ZysLet',
};

interface RootLayoutProps {
    children: ReactNode;
}
// ... existing code ...

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="scroll-smooth">
            <GoogleTagManager />
            <MetaPixel />
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
                <CartProvider>
                    <ToastProvider>
                        <CartAnimationProvider>
                            <NavbarWithSuspense />
                            {/* Wrapper div with padding that creates space for the fixed navbar and category bar */}
                            <div className="pt-[105px] md:pt-[70px] lg:pt-[70px]">
                                <main className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 pb-16">
                                    {children}
                                </main>
                            </div>
                            <Footer />
                        </CartAnimationProvider>
                    </ToastProvider>
                </CartProvider>
            </body>
        </html>
    );
}
