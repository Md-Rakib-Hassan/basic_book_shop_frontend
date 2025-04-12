import React from "react";
import { IReview } from "../types/review";
import Rating from "./Rating";

type TBookReviewProps = {
  Review: IReview;
};
const ReviewCart = (props: TBookReviewProps) => {
  const { Review } = props;
  const { ReviewData, UserId, BookId } = Review ?? {};
  const { Rating:Rated, ReviewText, ReviewDate } = ReviewData ?? {};

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
  return (
    <div className="flex  gap-4 mt-4 p-4  shadow-[0px_0px_8px_rgba(0,0,0,0.1)] rounded-md border-gray-100">
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
                  <Rating  dir="left" text="Rated it" rating={Rated} gap={[2,0.1]}></Rating>

          </div>
                  
        </div>
        <p className="text-sm text-gray-400">{formattedDate}</p>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm text-gray-500 text-justify">{ReviewText} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis deleniti vel, tempore distinctio quis quod omnis maiores atque labore explicabo rem cumque minus molestiae, voluptas in dolorem pariatur architecto?
          Natus corrupti error deserunt suscipit vel dolorem enim eum totam laudantium, debitis in sapiente harum exercitationem nostrum. Iste inventore in doloribus rem eligendi, temporibus molestiae excepturi minima explicabo odit aliquid!
          Porro impedit unde corrupti eos quisquam ad cum repellendus non, amet blanditiis nobis, accusantium, ipsam aperiam debitis dolorem quam inventore reiciendis distinctio est aspernatur laborum officia eveniet ut sapiente. Cum.
          Omnis asperiores maiores harum eaque distinctio! Ut hic minus, reiciendis neque, earum nam nulla dolorum perspiciatis est quia, modi consequuntur. Nesciunt accusamus deleniti amet corporis earum quaerat, unde labore non.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCart;
