'use client';
import React from 'react';

const ShippingReturnsContent: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping & Returns</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We strive to make your shopping experience seamless and stress-free. Learn about our shipping methods,
                    delivery times, and hassle-free return policy.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
                {/* Shipping Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Shipping Policy</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Shipping Methods & Times</h3>
                            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium">Inside Dhaka</p>
                                            <span className="text-blue-600 font-medium">৳60</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">Delivery within 1-2 business days</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium">Outside Dhaka</p>
                                            <span className="text-blue-600 font-medium">৳120</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">Delivery within 3-5 business days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Free Shipping</h3>
                            <p className="text-gray-700">We offer FREE shipping on all orders over:</p>
                            <div className="mt-4 grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <p className="text-gray-800 font-medium">Inside Dhaka</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">৳3,000+</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                                    <p className="text-gray-800 font-medium">Nationwide</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">৳5,000+</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Order Processing</h3>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    All orders are processed within 24 hours of being placed. Orders placed on weekends or
                                    holidays will be processed on the next business day.
                                </p>
                                <p className="text-gray-700">
                                    Once your order is processed, you will receive a confirmation email with your tracking
                                    information. You can track your order through our Track Your Order page.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium mb-1">Order Confirmation</h4>
                                <p className="text-sm text-gray-600">Within minutes of placing your order</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium mb-1">Order Processing</h4>
                                <p className="text-sm text-gray-600">Within 24 hours on business days</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="font-medium mb-1">Shipping</h4>
                                <p className="text-sm text-gray-600">After order processing is complete</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Returns Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Return Policy</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Return Period</h3>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 flex items-center">
                                <div className="mr-5">
                                    <div className="text-5xl font-bold text-blue-600">30</div>
                                    <div className="text-sm text-gray-600">DAYS</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700">
                                        We offer a 30-day return policy for most products. Items must be unused, in the same
                                        condition that you received them, and in their original packaging.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Return Process</h3>
                            <ol className="space-y-4">
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Request a Return</h4>
                                        <p className="text-gray-600 mt-1">
                                            Contact our customer service team at support@zyslet.com with your order
                                            number, reason for return, and photos if applicable.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Receive Return Authorization</h4>
                                        <p className="text-gray-600 mt-1">
                                            Our team will review your request and provide you with return instructions and a
                                            return authorization number within 24-48 hours.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Package & Ship Items</h4>
                                        <p className="text-gray-600 mt-1">
                                            Securely package the items with all original packaging materials, manuals, and
                                            accessories. Include the return authorization number clearly marked.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Refund Processing</h4>
                                        <p className="text-gray-600 mt-1">
                                            Once we receive and inspect your return, we will notify you of the approval or
                                            rejection of your refund. If approved, your refund will be processed within 7-10
                                            business days.
                                        </p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Non-Returnable Items</h3>
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <p className="text-gray-700 mb-3">
                                    The following items cannot be returned unless they are defective:
                                </p>
                                <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-500 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Personalized or custom-ordered items
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-500 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Sale or clearance items
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-500 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Items marked as Final Sale
                                    </li>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-red-500 mr-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Items with removed or damaged tags
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Refunds</h3>
                            <div className="space-y-3">
                                <p className="text-gray-700">
                                    Once your return is received and inspected, we will send you an email to notify you of
                                    the approval or rejection of your refund. If approved, your refund will be processed
                                    according to your original payment method:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                                        <div className="mr-3 mt-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-blue-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Credit/Debit Card Refunds</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Credit card refunds will be issued to the original credit card used and may
                                                take 5-10 business days to appear on your statement.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                                        <div className="mr-3 mt-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-blue-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Mobile Payment Refunds</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                bKash, Nagad and other mobile payment refunds will be processed within 3-5
                                                business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3">Damaged or Defective Items</h3>
                            <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                                <p className="text-gray-700">
                                    If you receive a damaged or defective item, please contact our customer service team
                                    immediately at <span className="text-blue-600 font-medium">support@zyslet.com</span>{' '}
                                    with photos of the defect and your order number. We will arrange a replacement or refund,
                                    depending on your preference and product availability.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    For damaged or defective products, we will cover the return shipping costs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Questions & Contact */}
                <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Have Questions?</h2>
                        <p className="text-gray-600">
                            Our customer service team is here to help with any questions about shipping or returns.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
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
                            </div>
                            <h3 className="font-medium mb-2">Email</h3>
                            <p className="text-sm text-gray-500 mb-2">Get a response within 24 hours</p>
                            <a href="mailto:support@zyslet.com" className="text-blue-600 hover:underline">
                                support@zyslet.com
                            </a>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
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
                            </div>
                            <h3 className="font-medium mb-2">Phone</h3>
                            <p className="text-sm text-gray-500 mb-2">Mon-Fri: 9AM to 6PM</p>
                            <a href="tel:+8801234567890" className="text-blue-600 hover:underline">
                                +880 1810-011145
                            </a>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-medium mb-2">Live Chat</h3>
                            <p className="text-sm text-gray-500 mb-2">Available 10AM to 8PM</p>
                            <button className="text-blue-600 hover:underline">Start Chat</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShippingReturnsContent;
