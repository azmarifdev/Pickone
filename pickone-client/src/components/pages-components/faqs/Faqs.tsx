/* eslint-disable react/no-unescaped-entities */
import FaqSection from '@/components/reusable/FaqSection';
import ContactSection from './ContactSection';

const FAQ = () => {
    const sections = [
        {
            id: 'warranty',
            title: 'Warranty Information',
            faqs: [
                {
                    question: 'What warranty coverage do you offer?',
                    answer: (
                        <div>
                            <p>We offer two types of warranty coverage:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>
                                    <strong>Standard 2-Year Warranty:</strong> All ZysLet solar lighting products come
                                    with our standard 2-year warranty against manufacturing defects.
                                </li>
                                <li>
                                    <strong>Premium 3-Year Extended Warranty:</strong> Selected premium products come with an
                                    extended 3-year warranty. Look for the "Premium Warranty" badge on eligible products.
                                </li>
                            </ul>
                        </div>
                    ),
                },
                {
                    question: "What's covered under warranty?",
                    answer: (
                        <div>
                            <p>Our warranty covers the following issues:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Manufacturing defects</li>
                                <li>Solar panel malfunctions</li>
                                <li>Battery charging issues</li>
                                <li>LED light failures</li>
                                <li>Weatherproofing issues</li>
                                <li>Motion sensor malfunctions</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    question: "What's not covered under warranty?",
                    answer: (
                        <div>
                            <p>The following are not covered under our warranty:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Physical damage from accidents or misuse</li>
                                <li>Damage from natural disasters</li>
                                <li>Improper installation</li>
                                <li>Unauthorized repairs or modifications</li>
                                <li>Normal wear and tear</li>
                                <li>Products purchased from unauthorized retailers</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    question: 'How do I submit a warranty claim?',
                    answer: (
                        <ol className="list-decimal ml-5 space-y-2">
                            <li>
                                Gather your proof of purchase, product model number, and take photos of the defect or issue
                            </li>
                            <li>
                                Fill out our warranty claim form online or contact our customer service at
                                warranty@zyslet.com
                            </li>
                            <li>Our team will review your claim within 3-5 business days</li>
                            <li>If approved, we'll arrange for a repair, replacement, or refund as appropriate</li>
                        </ol>
                    ),
                },
                {
                    question: 'When does my warranty period begin?',
                    answer: (
                        <p>
                            Your warranty period begins on the date of purchase as shown on your receipt or invoice. For
                            online orders, this is typically the date your order was delivered. All warranty claims must be
                            submitted within the applicable warranty period.
                        </p>
                    ),
                },
                {
                    question: "What happens if my product can't be repaired?",
                    answer: (
                        <p>
                            If we determine that your product cannot be repaired, we will replace it with the same model. If
                            that model is no longer available, we will provide a comparable model of equal or greater value.
                        </p>
                    ),
                },
            ],
        },
        {
            id: 'ordering',
            title: 'Ordering & Payment',
            faqs: [
                {
                    question: 'How do I place an order?',
                    answer: (
                        <div>
                            <p>Placing an order with ZysLet is easy:</p>
                            <ol className="list-decimal ml-5 mt-2 space-y-2">
                                <li>Browse our products and add items to your cart</li>
                                <li>Click on the cart icon in the top right corner</li>
                                <li>Review your items and click "Checkout"</li>
                                <li>Fill in your delivery and payment details</li>
                                <li>Click "Place Order" to complete your purchase</li>
                            </ol>
                            <p className="mt-2">
                                You'll receive an order confirmation via email immediately after your purchase.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: (
                        <div>
                            <p>We accept a variety of payment methods including:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
                                <li>bKash</li>
                                <li>Nagad</li>
                                <li>Cash on Delivery (COD)</li>
                            </ul>
                            <p className="mt-2">
                                All online payments are processed securely through industry-standard encryption.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'Is it safe to order online?',
                    answer: (
                        <p>
                            Yes, your security is our top priority. We use industry-standard SSL encryption to protect your
                            personal and payment information. Our payment processing systems comply with the highest security
                            standards to ensure safe transactions.
                        </p>
                    ),
                },
                {
                    question: 'Can I modify or cancel my order?',
                    answer: (
                        <p>
                            You can modify or cancel your order within 1 hour of placing it by contacting our customer
                            service team. Once an order has entered the processing stage, we cannot guarantee that changes
                            can be made. Please contact us as soon as possible at support@zyslet.com with your order
                            number.
                        </p>
                    ),
                },
            ],
        },
        {
            id: 'shipping',
            title: 'Shipping & Delivery',
            faqs: [
                {
                    question: 'How long will it take to receive my order?',
                    answer: (
                        <div>
                            <p>Delivery times depend on your location:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>
                                    <strong>Inside Dhaka:</strong> 1-2 business days
                                </li>
                                <li>
                                    <strong>Outside Dhaka:</strong> 3-5 business days
                                </li>
                            </ul>
                            <p className="mt-2">
                                Please note that delivery times may be affected during peak seasons, holidays, or unforeseen
                                circumstances. You'll receive tracking information via email once your order has been
                                shipped.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'How much does shipping cost?',
                    answer: (
                        <div>
                            <p>Our shipping rates are as follows:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>
                                    <strong>Inside Dhaka:</strong> ৳60
                                </li>
                                <li>
                                    <strong>Outside Dhaka:</strong> ৳120
                                </li>
                            </ul>
                            <p className="mt-2">
                                We offer free shipping for orders over ৳3,000 within Dhaka and ৳5,000 nationwide.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'Do you ship internationally?',
                    answer: (
                        <p>
                            Currently, we only ship within Bangladesh. We're working on expanding our shipping options to
                            include international delivery in the future. Stay tuned for updates!
                        </p>
                    ),
                },
                {
                    question: 'How can I track my order?',
                    answer: (
                        <p>
                            Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this
                            number to track your package on our website under "Track Your Order". Alternatively, you can
                            contact our customer service team with your order number for status updates.
                        </p>
                    ),
                },
            ],
        },
        {
            id: 'returns',
            title: 'Returns & Refunds',
            faqs: [
                {
                    question: 'What is your return policy?',
                    answer: (
                        <div>
                            <p>
                                We offer a 30-day return policy for most products. To be eligible for a return, your item
                                must be unused, in the same condition that you received it, and in its original packaging.
                            </p>
                            <p className="mt-2">
                                Please note that certain products, such as personalized items or sale merchandise, may not be
                                eligible for return unless they are defective.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'How do I return a product?',
                    answer: (
                        <ol className="list-decimal ml-5 space-y-2">
                            <li>Contact our customer service team at support@zyslet.com to request a return</li>
                            <li>Include your order number and reason for return</li>
                            <li>Our team will provide you with return instructions and a return authorization number</li>
                            <li>Package the item securely with all original packaging</li>
                            <li>
                                Ship the item to the address provided with the return authorization number clearly marked
                            </li>
                        </ol>
                    ),
                },
                {
                    question: 'When will I receive my refund?',
                    answer: (
                        <p>
                            Once we receive and inspect your return, we'll send you a notification. If approved, your refund
                            will be processed within 7-10 business days. The time it takes for the refund to appear in your
                            account depends on your payment method and financial institution.
                        </p>
                    ),
                },
                {
                    question: 'What if I received a defective product?',
                    answer: (
                        <p>
                            If you receive a defective product, please contact our customer service team immediately at
                            support@zyslet.com with photos of the defect and your order number. We'll arrange a
                            replacement or refund, depending on your preference and product availability. For defective
                            products, we'll also cover the return shipping costs.
                        </p>
                    ),
                },
            ],
        },
        {
            id: 'products',
            title: 'Product Information',
            faqs: [
                {
                    question: 'Are your solar products weather-resistant?',
                    answer: (
                        <p>
                            Yes, all of our outdoor solar lighting products are designed to be weather-resistant and can
                            withstand various weather conditions, including rain and moderate heat. However, extreme
                            conditions like flooding or severe storms may affect their performance. We recommend checking the
                            product specifications for the IP (Ingress Protection) rating to understand the level of
                            protection for each product.
                        </p>
                    ),
                },
                {
                    question: 'How long do your solar lights last?',
                    answer: (
                        <div>
                            <p>The lifespan of our solar lights depends on several factors:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>
                                    <strong>Battery Life:</strong> Most of our solar lights use rechargeable batteries that
                                    last 1-2 years before needing replacement
                                </li>
                                <li>
                                    <strong>LED Bulbs:</strong> The LED bulbs in our solar lights typically last
                                    30,000-50,000 hours of operation
                                </li>
                                <li>
                                    <strong>Solar Panel:</strong> The solar panels have an average lifespan of 5-7 years
                                </li>
                            </ul>
                            <p className="mt-2">
                                All our products come with a 2-year warranty against manufacturing defects.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'Do solar lights work in cloudy weather?',
                    answer: (
                        <p>
                            Yes, but with reduced efficiency. Our solar lights can still charge during cloudy days, though at
                            a lower capacity. Most of our solar lights can store enough energy to operate for 2-3 days even
                            with minimal sunlight. For optimal performance, place your solar lights in areas that receive
                            maximum direct sunlight during the day.
                        </p>
                    ),
                },
                {
                    question: 'How do I maintain my solar lights?',
                    answer: (
                        <div>
                            <p>Proper maintenance will extend the life of your solar lights:</p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Keep the solar panel clean and free from dust, dirt, or debris</li>
                                <li>
                                    Position solar lights where they can receive at least 6 hours of direct sunlight daily
                                </li>
                                <li>During rainy seasons, check that water hasn't accumulated around the lights</li>
                                <li>
                                    During winter or extended periods of non-use, store the lights indoors after fully
                                    charging the batteries
                                </li>
                                <li>Replace rechargeable batteries every 1-2 years for optimal performance</li>
                            </ul>
                        </div>
                    ),
                },
            ],
        },
        {
            id: 'warranty',
            title: 'Warranty & Support',
            faqs: [
                {
                    question: 'What warranty do you offer?',
                    answer: (
                        <div>
                            <p>
                                All ZysLet products come with a 2-year warranty against manufacturing defects. This
                                covers:
                            </p>
                            <ul className="list-disc ml-5 mt-2">
                                <li>Material and workmanship defects</li>
                                <li>Failure of LED lights</li>
                                <li>Solar panel charging issues</li>
                                <li>Circuit board malfunctions</li>
                            </ul>
                            <p className="mt-2">
                                The warranty does not cover damages due to improper use, accidents, or natural disasters.
                                Battery degradation over time is considered normal wear and tear and is covered for 6 months.
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'How do I claim warranty?',
                    answer: (
                        <ol className="list-decimal ml-5 space-y-2">
                            <li>
                                Contact our customer service at warranty@zyslet.com with your order number and purchase
                                proof
                            </li>
                            <li>Provide clear photos or videos showing the defect</li>
                            <li>Describe the issue in detail, including when it started</li>
                            <li>Our warranty team will review your claim within 48 hours</li>
                            <li>If approved, we'll arrange for a replacement or repair as appropriate</li>
                        </ol>
                    ),
                },
                {
                    question: 'Do you offer after-sales support?',
                    answer: (
                        <p>
                            Yes, we provide comprehensive after-sales support for all our products. Our support team can
                            assist with product advice, installation guidance, troubleshooting, and warranty claims. You can
                            contact us via email at support@zyslet.com, phone at +880 1810-011145 (Mon-Fri, 9AM-6PM), or
                            through the live chat feature on our website.
                        </p>
                    ),
                },
                {
                    question: 'Can I extend my warranty?',
                    answer: (
                        <p>
                            Yes, we offer extended warranty options for most of our premium products. You can purchase an
                            additional 1-year or 2-year warranty extension at the time of your purchase. Extended warranties
                            provide the same coverage as our standard warranty for the additional period. Contact our
                            customer service for more information about extended warranty options and pricing.
                        </p>
                    ),
                },
            ],
        },
        {
            id: 'account',
            title: 'Account & Privacy',
            faqs: [
                {
                    question: 'How do I create an account?',
                    answer: (
                        <div>
                            <p>Creating an account is easy:</p>
                            <ol className="list-decimal ml-5 mt-2 space-y-2">
                                <li>Click on the "Sign In" button at the top right of the website</li>
                                <li>Select "Create an account"</li>
                                <li>Enter your email address and create a password</li>
                                <li>Fill in your name and contact details</li>
                                <li>Click "Create Account"</li>
                            </ol>
                            <p className="mt-2">
                                You'll receive a verification email. Click the link in the email to verify your account and
                                start shopping!
                            </p>
                        </div>
                    ),
                },
                {
                    question: 'How is my personal information protected?',
                    answer: (
                        <p>
                            We take your privacy seriously. Your personal information is protected using industry-standard
                            encryption and security protocols. We never share your personal data with third parties without
                            your consent except as required to fulfill your order (such as sharing delivery details with our
                            shipping partners). For full details, please refer to our Privacy Policy.
                        </p>
                    ),
                },
                {
                    question: 'Can I shop without creating an account?',
                    answer: (
                        <p>
                            Yes, we offer a guest checkout option that allows you to complete a purchase without creating an
                            account. However, creating an account offers several benefits including order tracking, faster
                            checkout, order history, and special offers for registered customers.
                        </p>
                    ),
                },
                {
                    question: 'How do I reset my password?',
                    answer: (
                        <ol className="list-decimal ml-5 space-y-2">
                            <li>Click on the "Sign In" button</li>
                            <li>Select "Forgot password?"</li>
                            <li>Enter the email address associated with your account</li>
                            <li>Click "Reset Password"</li>
                            <li>Check your email for a password reset link</li>
                            <li>Click the link and follow the instructions to create a new password</li>
                        </ol>
                    ),
                },
            ],
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Find answers to common questions about our products, ordering process, shipping, and more. Can't find
                    what you're looking for?{' '}
                    <a href="/contact" className="text-blue-600 hover:underline">
                        Contact our support team
                    </a>
                    .
                </p>
            </div>

            <FaqSection sections={sections} />

            <ContactSection />
        </div>
    );
};

export default FAQ;
