export default function PrivacyPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your personal
                    information when you use our website and services.
                </p>
                <p className="text-sm text-gray-500 mt-4">Last updated: January 27, 2025</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
                {/* Information We Collect Section */}
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            We collect information from you when you visit our website, create an account, make a purchase,
                            or interact with our services. This information helps us provide you with better products and a
                            more personalized experience.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-3 text-gray-800">Personal Information</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Name and contact information</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Email address and phone number</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Billing and shipping addresses</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Payment information (processed securely)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-lg mb-3 text-gray-800">Usage Information</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Website browsing patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Device and browser information</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">IP address and location data</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">Search queries and preferences</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How We Use Information Section */}
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
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            We collect and use your information through this website to provide you with enhanced services
                            and better user experiences. Our goal is to serve you better while respecting your privacy.
                        </p>

                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">Primary Uses</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Process and fulfill your orders</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Provide customer support and assistance</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Send order confirmations and updates</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Improve our website and user experience</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Personalize your shopping experience</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-1 rounded-full flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Send promotional offers (with your consent)</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                            <div className="flex items-center gap-3 mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                                <h3 className="font-semibold text-lg text-gray-800">Enhanced User Experience</h3>
                            </div>
                            <p className="text-gray-700">
                                We use the data collected through this website to provide you with better convenience and
                                more relevant product recommendations, faster checkout processes, and personalized content
                                that matches your interests and preferences.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Data Security Section */}
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
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Data Security & Protection</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            We take the security of your personal information seriously and implement various measures to
                            protect your data from unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
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
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">SSL Encryption</h3>
                                <p className="text-gray-600 text-sm">
                                    All data transmission is protected with industry-standard SSL encryption technology.
                                </p>
                            </div>

                            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
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
                                            d="M5 12h14l-5-5m0 0v10"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Secure Storage</h3>
                                <p className="text-gray-600 text-sm">
                                    Your data is stored on secure servers with restricted access and regular security
                                    updates.
                                </p>
                            </div>

                            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
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
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Access Controls</h3>
                                <p className="text-gray-600 text-sm">
                                    Only authorized personnel have access to your information on a need-to-know basis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cookies Section */}
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
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Cookies & Tracking</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your browsing experience and analyze
                            website usage patterns. These technologies help us remember your preferences and provide you with
                            a more personalized experience.
                        </p>

                        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                            <h3 className="font-semibold text-lg mb-3 text-gray-800">Types of Cookies We Use</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-yellow-100 p-1 rounded-full flex-shrink-0 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-yellow-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800">Essential Cookies:</span>
                                        <span className="text-gray-700">
                                            {' '}
                                            Required for website functionality and security
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-yellow-100 p-1 rounded-full flex-shrink-0 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-yellow-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800">Analytics Cookies:</span>
                                        <span className="text-gray-700">
                                            {' '}
                                            Help us understand how visitors use our website
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-yellow-100 p-1 rounded-full flex-shrink-0 mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3 text-yellow-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-800">Preference Cookies:</span>
                                        <span className="text-gray-700"> Remember your settings and preferences</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Your Rights Section */}
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Your Rights & Choices</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700 leading-relaxed">
                            You have several rights regarding your personal information. We respect these rights and provide
                            you with the tools to exercise them.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
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
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Access Your Data</h3>
                                        <p className="text-gray-600 text-sm">
                                            Request a copy of all personal information we have about you.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
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
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Correct Your Data</h3>
                                        <p className="text-gray-600 text-sm">
                                            Update or correct any inaccurate information in your account.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
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
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Delete Your Data</h3>
                                        <p className="text-gray-600 text-sm">
                                            Request deletion of your personal information from our systems.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
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
                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364L18.364 5.636"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Opt-Out</h3>
                                        <p className="text-gray-600 text-sm">
                                            Unsubscribe from marketing emails and promotional communications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Questions About Privacy?</h2>
                        <p className="max-w-2xl mx-auto">
                            If you have any questions about this privacy policy or how we handle your data, please contact
                            us.
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
                            <p className="text-sm text-blue-100">privacy@zyslet.com</p>
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
