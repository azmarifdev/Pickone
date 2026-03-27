// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Warranty Information - ZysLet',
//     description:
//         'Learn about our product warranties, coverage policies, and how to make warranty claims for your ZysLet solar lighting products.',
// };

export default function WarrantyPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="mb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Warranty Information</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We stand behind the quality of our products with comprehensive warranty coverage. Learn about our
                    warranty terms, what is covered, and how to submit a claim.
                </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
                {/* Standard Warranty Section */}
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
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Our Warranty Coverage</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 flex items-center mb-6">
                                <div className="mr-5">
                                    <div className="text-5xl font-bold text-blue-600">2</div>
                                    <div className="text-sm text-gray-600">YEARS</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">Standard Product Warranty</h3>
                                    <p className="text-gray-700">
                                        All ZysLet solar lighting products come with our standard 2-year warranty
                                        against manufacturing defects. This warranty ensures your product will function as
                                        intended under normal use conditions.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-lg mb-3">What is Covered</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>Manufacturing defects</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>Solar panel malfunctions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>Battery charging issues</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>LED light failures</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>Weatherproofing issues</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                                            <span>Motion sensor malfunctions</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-lg mb-3">What is Not Covered</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Physical damage from accidents or misuse</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Damage from natural disasters</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Improper installation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Unauthorized repairs or modifications</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Normal wear and tear</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            <span>Products purchased from unauthorized retailers</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border border-blue-100">
                                <h3 className="font-semibold text-lg mb-3">Premium Product Line Extended Warranty</h3>
                                <div className="flex items-center mb-4">
                                    <div className="bg-white rounded-full p-2 mr-4">
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
                                    <div>
                                        <p className="text-gray-700">
                                            Selected premium products come with an extended 3-year warranty for additional
                                            peace of mind. Look for the Premium Warranty badge on eligible products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Warranty Claim Process */}
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
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Warranty Claim Process</h2>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-700">
                            If you experience an issue with your ZysLet product that you believe is covered by our
                            warranty, please follow these steps to initiate a warranty claim:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center">
                                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">1</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-3">Prepare Information</h3>
                                <p className="text-gray-600">
                                    Gather your proof of purchase, product model number, and take photos of the defect or
                                    issue.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center">
                                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">2</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-3">Submit Claim</h3>
                                <p className="text-gray-600">
                                    Fill out our warranty claim form online or contact our customer service team at
                                    support@zyslet.com
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center">
                                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                                    <span className="text-blue-600 font-bold text-xl">3</span>
                                </div>
                                <h3 className="font-semibold text-lg mb-3">Resolution</h3>
                                <p className="text-gray-600">
                                    Our team will review your claim and provide a repair, replacement, or refund as
                                    appropriate.
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100 flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-yellow-500 mr-4 mt-0.5 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Important Notice</h3>
                                <p className="text-gray-700">
                                    All warranty claims must be submitted within the applicable warranty period. Please be
                                    prepared to provide your original proof of purchase. Claims processing typically takes
                                    3-5 business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Warranty FAQs */}
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
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-lg mb-2">When does my warranty period begin?</h3>
                            <p className="text-gray-700">
                                Your warranty period begins on the date of purchase as shown on your receipt or invoice. For
                                online orders, this is typically the date your order was delivered.
                            </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-lg mb-2">
                                Do I need to register my product for warranty coverage?
                            </h3>
                            <p className="text-gray-700">
                                No, registration is not required for standard warranty coverage. However, we recommend
                                registering your product for easier warranty service and to receive product updates.
                            </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-lg mb-2">What happens if my product cannot be repaired?</h3>
                            <p className="text-gray-700">
                                If we determine that your product cannot be repaired, we will replace it with the same model.
                                If that model is no longer available, we will provide a comparable model of equal or greater
                                value.
                            </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold text-lg mb-2">Is the warranty transferable to another owner?</h3>
                            <p className="text-gray-700">
                                ZysLet warranties are non-transferable and extend only to the original purchaser with
                                valid proof of purchase.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">
                                What if my product fails after the warranty period?
                            </h3>
                            <p className="text-gray-700">
                                For products outside of warranty, we offer repair services at reasonable rates. Contact our
                                customer service team for a quote on out-of-warranty repairs or replacement options.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Need Help With Your Warranty?</h2>
                        <p className="max-w-2xl mx-auto">
                            Our customer service team is here to assist you with any warranty questions or claims.
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
                            <p className="text-sm text-blue-100">warranty@zyslet.com</p>
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
                            <p className="text-sm text-blue-100">+880 1810-011145</p>
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
                            <p className="text-sm text-blue-100">Available 9AM-6PM EST</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
