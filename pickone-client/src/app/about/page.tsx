export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">About ZysLet</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Your trusted partner for quality products across diverse categories. We are a global company with
                    operations in both Asia and Bangladesh, committed to bringing you the best products at competitive
                    prices.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
                {/* Our Story Section */}
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-14 0h2m0 0h2m-2 0v-14a2 2 0 012-2h2a2 2 0 012 2v14M9 7h6m-6 4h6m-6 4h6"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            ZysLet was founded with a vision to make quality products accessible to everyone through
                            convenient online shopping. What started as a passion for connecting customers with great
                            products has grown into a global enterprise that spans across continents, bringing diverse
                            product categories to customers worldwide.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Our journey began with a simple belief: that quality products should be affordable, reliable, and
                            easily accessible. Today, we continue to uphold these values while expanding our product range to
                            serve customers across different markets and cultures.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-100">
                            <h3 className="font-semibold text-lg mb-3 text-gray-800">Our Mission</h3>
                            <p className="text-gray-700">
                                To provide customers with access to quality products across various categories while ensuring
                                excellent service, competitive pricing, and a seamless shopping experience that exceeds
                                expectations.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Global Presence Section */}
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
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Our Global Presence</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* China Office */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
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
                                <h3 className="font-semibold text-lg text-gray-800">China Operations</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-700 font-medium">Product Sourcing & Quality Control</p>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    <strong>Address:</strong>
                                    <br />
                                    Cainiao Post Office at the west gate of Kaixuan International
                                    <br />
                                    No. 106 Sandao Avenue, Hufu District
                                    <br />
                                    Guangzhou City, Guangdong Province
                                    <br />
                                    China
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Our China facility serves as our primary product sourcing and quality control center,
                                    where we work with trusted manufacturers to ensure the highest quality standards across
                                    all product categories.
                                </p>
                            </div>
                        </div>

                        {/* Bangladesh Office */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
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
                                <h3 className="font-semibold text-lg text-gray-800">Bangladesh Operations</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-700 font-medium">Regional Headquarters & Customer Service</p>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    <strong>Address:</strong>
                                    <br />
                                    Mirpur 2<br />
                                    Dhaka, Bangladesh
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Our Bangladesh headquarters focuses on regional market development, customer service, and
                                    order fulfillment across South Asia, ensuring localized support and efficient delivery
                                    services.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
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
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                            <p className="text-gray-600 text-sm">
                                Curating diverse product categories with rigorous quality checks to bring you only the best
                                items that meet our high standards.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                            <div className="bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Competitive Pricing</h3>
                            <p className="text-gray-600 text-sm">
                                Working directly with manufacturers and suppliers to offer great value products at
                                competitive prices without compromising on quality.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-100">
                            <div className="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-purple-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Customer Focus</h3>
                            <p className="text-gray-600 text-sm">
                                Putting our customers first by delivering exceptional products and outstanding service across
                                all touchpoints.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
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
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Why Choose ZysLet</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-green-600"
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
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                                    <p className="text-gray-600">
                                        Every product undergoes careful selection and quality checks to ensure you receive
                                        items that meet our high standards and your expectations.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
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
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Diverse Selection</h3>
                                    <p className="text-gray-600">
                                        Offering a wide range of products across multiple categories to meet various customer
                                        needs and preferences in one convenient location.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Global Network</h3>
                                    <p className="text-gray-600">
                                        With operations across multiple countries, we provide reliable sourcing, quality
                                        control, and efficient delivery services worldwide.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-yellow-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Best Value</h3>
                                    <p className="text-gray-600">
                                        Direct relationships with suppliers and efficient operations allow us to offer
                                        competitive prices while maintaining excellent product quality and service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                        <p className="max-w-2xl mx-auto">
                            Have questions about our company or products? We would love to hear from you.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
                        <div>
                            <div className="bg-white/20 p-4 rounded-lg mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 mx-auto text-white"
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
                            <h3 className="font-semibold mb-1">Email Us</h3>
                            <p className="text-sm text-blue-100">info@zyslet.com</p>
                        </div>
                        <div>
                            <div className="bg-white/20 p-4 rounded-lg mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 mx-auto text-white"
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
                            <h3 className="font-semibold mb-1">Call Us</h3>
                            <p className="text-sm text-blue-100">+880 1778-687470</p>
                        </div>
                        <div>
                            <div className="bg-white/20 p-4 rounded-lg mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 mx-auto text-white"
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
                            <h3 className="font-semibold mb-1">Live Chat</h3>
                            <p className="text-sm text-blue-100">Available 10AM-6PM (Sat-Thu)</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
