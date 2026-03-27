'use client';

import React from 'react';

const ContactPageComponent = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        // TODO: Implement form submission logic here (e.g., send data to an API endpoint)
        alert('Thank you for your message! We will get back to you soon.');
        // Optionally reset the form
        (event?.target as HTMLFormElement).reset();
    };

    // FAQ items for common customer questions
    const faqs = [
        {
            question: 'How long does shipping take?',
            answer: 'For domestic orders, delivery typically takes 2-4 business days. International shipping can take 7-14 business days depending on the destination country.',
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy. Products must be unused and in original packaging. Contact our customer service team to initiate the return process.',
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to most international destinations. Shipping costs and delivery times vary based on location.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email. You can also track your order on our website by entering the order number in the order tracking section.',
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="container mx-auto px-0 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about our products or services? Our team is here to help you with anything you need.
                    </p>
                </div>
            </div>

            {/* Main Contact Section */}
            <div className="container mx-auto px-0 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

                        <div className="mb-8">
                            <p className="text-gray-600 mb-6">
                                Our customer service team is available to assist you with any questions, concerns, or
                                feedback you may have about our products or services.
                            </p>

                            <div className="space-y-6">
                                {/* Contact Details */}
                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                                        <p className="text-gray-600">
                                            123 E-commerce St,
                                            <br />
                                            Online City, Web 45678
                                            <br />
                                            Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                                        <p className="text-gray-600">Customer Service: (123) 456-7890</p>
                                        <p className="text-gray-600">WhatsApp: +880 1810-011145</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-600">Customer Support: support@zyslet.com</p>
                                        <p className="text-gray-600">Order Inquiries: orders@zyslet.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Business Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/ZysLet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-blue-600">
                                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/zyslet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-pink-600">
                                        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.67.645-1.276 1.153-1.772a4.904 4.904 0 0 1 1.772-1.153c.637-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Z" />
                                        <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5Zm5.25-9.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.twitter.com/zyslet"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-blue-400">
                                        <path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.93 3.93 0 0 1-1.1.17 4.9 4.9 0 0 1-.77-.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 3 18.34a7.93 7.93 0 0 1-1-.06 11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://wa.me/+8801234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 hover:bg-green-100 p-3 rounded-full transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-green-600">
                                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.72 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.891-9.885 9.891m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Us</h3>
                            <div className="bg-gray-200 h-72 rounded-lg overflow-hidden border border-gray-300">
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    {/* Replace with actual Google Maps iframe */}
                                    <div className="text-center">
                                        <svg
                                            className="w-12 h-12 text-gray-400 mx-auto mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <p className="text-gray-500">Google Map will be displayed here</p>
                                        <p className="text-sm text-gray-400">
                                            Replace with your Google Maps API integration
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Rest of the form content */}
                                {/* Phone Number field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Your Phone Number (optional)"
                                    />
                                </div>

                                {/* Order Number field */}
                                <div>
                                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Order Number (if applicable)
                                    </label>
                                    <input
                                        type="text"
                                        id="orderNumber"
                                        name="orderNumber"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="e.g. ORD-12345"
                                    />
                                </div>

                                {/* Subject field */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="What is your message about?"
                                    />
                                </div>

                                {/* Inquiry Type dropdown */}
                                <div>
                                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
                                        Inquiry Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="inquiry"
                                        name="inquiry"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white">
                                        <option value="">Select an option</option>
                                        <option value="order">Order Status</option>
                                        <option value="return">Returns & Refunds</option>
                                        <option value="product">Product Information</option>
                                        <option value="shipping">Shipping & Delivery</option>
                                        <option value="complaint">Complaint</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message textarea */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Please provide as much detail as possible about your inquiry..."></textarea>
                                </div>

                                {/* Newsletter checkbox */}
                                <div className="flex items-center">
                                    <input
                                        id="newsletter"
                                        name="newsletter"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-600">
                                        Sign up for our newsletter to receive updates and promotions
                                    </label>
                                </div>

                                {/* Submit button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            />
                                        </svg>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 mb-4">
                                Still have questions? Our customer service team is ready to help.
                            </p>
                            <a
                                href="mailto:support@zyslet.com"
                                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                                Contact our support team
                                <svg
                                    className="w-5 h-5 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPageComponent;
