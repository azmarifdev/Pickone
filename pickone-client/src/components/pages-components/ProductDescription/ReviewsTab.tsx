import React, { useState } from 'react';
import CustomerReview from './CustomerReview';
import ReviewForm from './ReviewForm';
import { Review } from '@/app/product/types';

interface ReviewsTabProps {
    reviews: Review[];
    productId: string;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, productId }) => {
    const [isReviewAdded, setIsReviewAdded] = useState(false);

    // Calculate average rating
    const averageRating =
        reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

    return (
        <div className="prose max-w-none text-gray-600">
            {/* Review summary section */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-3 md:p-6 rounded-xl mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">Customer Reviews</h3>
                        <div className="flex items-center justify-center md:justify-start mb-1">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5"
                                        fill={i < Math.round(Number(averageRating)) ? 'currentColor' : '#d1d5db'}
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{averageRating} out of 5</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>

                    <div className="flex-1 h-20 flex items-center justify-center md:justify-end">
                        <div
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer max-w-xs text-center"
                            onClick={() =>
                                document.getElementById('write-review-section')?.scrollIntoView({ behavior: 'smooth' })
                            }>
                            <span className="font-medium">Write a Review</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="lg:w-2/3">
                    {/* Reviews list */}
                    <div>
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review, index) => <CustomerReview key={index} {...review} />)
                        ) : (
                            <div className="bg-white p-4 md:p-8 rounded-lg text-center border border-gray-200 shadow-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 mx-auto text-gray-400 mb-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:w-1/3" id="write-review-section">
                    {/* Write review form */}
                    <div className="bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                        {!isReviewAdded ? (
                            <>
                                <div className="flex items-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-600 mr-2"
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
                                    <h4 className="text-lg font-semibold text-gray-800">Write a Review</h4>
                                </div>
                                <ReviewForm
                                    productId={productId}
                                    onReviewSubmitted={() => {
                                        setIsReviewAdded(true);
                                    }}
                                />
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-green-600 mb-4">Thank You for Your Review!</h4>
                                <p className="text-gray-600">
                                    Your review has been submitted and is under review. It will appear soon after approval.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* <ProductGuarantee /> */}
                </div>
            </div>
        </div>
    );
};

/* const ProductGuarantee = () => {
    return (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-white p-3 md:p-6 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-blue-600"
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
                <h4 className="text-xl font-semibold text-blue-800">ZysLet Guarantee</h4>
            </div>
            <ul className="space-y-3">
                {['100% authentic products', '30-day money back', '2-year warranty'].map((item, index) => (
                    <li key={index} className="flex items-center text-base text-blue-700">
                        <svg className="min-w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}; */

export default ReviewsTab;
