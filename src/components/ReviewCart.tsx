import React, { useState } from "react";
import { IReview } from "../types/review";
import Rating from "./Rating";

type TBookReviewProps = {
  Review: IReview;
};

const ReviewCart = (props: TBookReviewProps) => {
  const { Review } = props;
  const { ReviewData, UserId } = Review ?? {};
  const { Rating: Rated, ReviewText, ReviewDate } = ReviewData ?? {};
  const [showFull, setShowFull] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedDate = formatDate(ReviewDate);

  // Limit preview to 300 chars
  const previewText = ReviewText.length > 300 ? ReviewText.slice(0, 300) + "..." : ReviewText;

  return (
    <div className="flex gap-4 mt-4 p-4 shadow-[0px_0px_8px_rgba(0,0,0,0.1)] rounded-md border-gray-100 mb-10">
      <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
        <img
          src={UserId.ProfileImage}
          alt="profile of user"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h1 className="text-md text-gray-600 font-semibold">{UserId.Name}</h1>
          <div className="flex">
            <Rating dir="left" text="Rated it" rating={Rated} gap={[2, 0.1]} />
          </div>
        </div>
        <p className="text-sm text-gray-400">{formattedDate}</p>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm text-gray-500 text-justify">
            {showFull ? ReviewText : previewText}
            {ReviewText.length > 300 && (
              <button
                className="ml-2 text-blue-600 font-medium"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;
