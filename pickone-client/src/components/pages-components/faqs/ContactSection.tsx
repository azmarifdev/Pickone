'use client';

import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitted(true);
        setEmail('');
        setMessage('');

        // Reset success message after a few seconds
        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <div className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-center mb-6">Still have questions?</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                    <h3 className="text-lg font-semibold mb-3">Contact our support team</h3>
                    <p className="text-gray-600 mb-4">
                        Our dedicated customer support team is here to help! Fill out this form or reach out through one of
                        our contact channels:
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-start">
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
                            <span>support@zyslet.com</span>
                        </div>
                        <div className="flex items-start">
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
                            <span>+880 1810-011145</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 w-full">
                    {submitted ? (
                        <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mx-auto mb-2 text-green-500"
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
                            <h4 className="font-medium">Message sent successfully!</h4>
                            <p className="text-sm mt-1">We will get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Question
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Submit Question
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
