import React from 'react';
import {  IReviewSummary } from '../types/review';
import Rating from './Rating';
import ReviewCart from './ReviewCart';
type TBookReviewProps = {
    bookReview:IReviewSummary
}

const BookReview = (props: TBookReviewProps) => {
    const { bookReview } = props;
    const { Reviews, AverageRating, TotalReviews } = bookReview ?? {};
    return (
        <div>
            <div className="flex items-center gap-2 mt-10 text-gray-600 border-b-2 border-gray-200 pb-4">
                
                    <span className="font-semibold text-lg">Community Reviews</span> &nbsp;
                    <Rating rating={AverageRating} TotalReviews={TotalReviews}></Rating>
                
            </div>
            
            <div>
                {Reviews?.map((review) => <ReviewCart key={review.ReviewData.ReviewText} Review={review}></ReviewCart>)}

            </div>
        </div>
    );
};

export default BookReview;