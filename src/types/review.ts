import { IUser } from "./user";

export interface IReviewSummary {
    Reviews: IReview[];
    AverageRating: number;
    TotalReviews: number;
  }
  
  export interface IReview {
    ReviewData: {
      Rating: number;
      ReviewText: string;
      ReviewDate: string;
    };
    _id: string;
    UserId: IUser;
    BookId: string;
    __v: number;
  }