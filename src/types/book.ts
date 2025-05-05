import { IAuthor } from "./author";
import { IReviewSummary } from "./review";

export enum Category {
    Fiction = 'Fiction',
    Science = 'Science',
    SelfDevelopment = 'SelfDevelopment',
    Poetry = 'Poetry',
    Religious = 'Religious',
  }
  

export interface SpecificBookApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: IBook;
}

export interface IBook {
  _id: string;
  Title: string;
  Author: string;
  Price: number;
  Category: Category;
  Description: string;
  StockQuantity: number;
  ISBN: string;
  PublishedYear: number;
  ImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  Reviews: IReviewSummary;
}


