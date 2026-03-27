'use client';

import { FC, memo } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
    const footerLinks = [
        {
            title: 'Customer Service',
            links: [
                { name: 'FAQs', href: '/faqs' },
                { name: 'Shipping & Returns', href: '/shipping-returns' },
            ],
        },
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Privacy Policy', href: '/privacy' },
            ],
        },
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/ZysLet',
        },
        {
            name: 'WhatsApp',
            href: 'https://wa.me/8801778687470',
        },
    ];

    return (
        <footer className="bg-white mt-0">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* 2x2 grid on mobile, single row on tablet/desktop */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-6">
                    {/* Social links */}
                    <div className="col-span-1 px-2 md:px-0">
                        <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                        <ul className="space-y-2">
                            {socialLinks.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                        aria-label={social.name}>
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service links */}
                    <div className="col-span-1 px-2 md:px-0">
                        <h3 className="font-semibold text-gray-800 mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            {footerLinks[0].links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div className="col-span-1 px-2 md:px-0">
                        <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks[1].links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact information */}
                    <div className="col-span-1 px-2 md:px-0">
                        <h3 className="font-semibold text-gray-800 mb-4">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600 mt-0.5 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span className="text-gray-500">+880 1778-687470</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600 mt-0.5 mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:support@zyslet.com"
                                    className="text-gray-500 hover:text-blue-600 transition-colors duration-200 break-all sm:break-normal">
                                    support@zyslet.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Payment methods */}
            </div>
        </footer>
    );
};

export default memo(Footer);
