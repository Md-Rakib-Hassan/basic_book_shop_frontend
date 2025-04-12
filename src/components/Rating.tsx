import { text } from 'framer-motion/client';
import React from 'react';
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';

type TRatingProps = {
    rating: number,
    TotalReviews?: number,
    gap?: number[],
    textSize?: string,
    text?: string,
    dir?: string

}

const Rating = (props: TRatingProps) => {
    const { rating, TotalReviews, gap,textSize,text,dir } = props;

    return (
        <div className={`flex ${dir=='left'?'flex-row-reverse':''}  items-center gap-${(gap&&gap[0])?gap[0]:4}`}>
              <div className={`flex text-${textSize?textSize:'md'} items-center gap-${(gap&&gap[1])?gap[1]:1}`}>
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(rating)) {
                    return <FaStar key={i} className="text-highlight" />;
                  } else if (i < rating) {
                    return <FaRegStarHalfStroke key={i} className="text-highlight" />;
                  } else {
                    return <FaRegStar key={i} className="text-highlight" />;
                  }
                })}
              </div>
        
              <div className="text-md text-gray-400">
                {TotalReviews}  {text? text : ' Reviews'}
              </div>
            </div>
    );
};

export default Rating;