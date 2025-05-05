import React, { FC } from "react";
import { IBook } from "../types";
import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router";

interface IBookProps {
  book: IBook;
  types: "bestSeller" | "topRated" | "limitedOffer";
}

const BookCard: FC<IBookProps> = ({ book, types }) => {
  const rating: number = 4.7;
  const reviewCount: number = 326;
  const offerPercent = 20;

  const ratingComp = (
    <div className="flex items-center gap-2">
      <div className="flex text-sm items-center ">
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

      <div className="font-medium text-sm text-gray-400">
        {reviewCount} reviews
      </div>
    </div>
  );

  return (
    <Link to={`/books/${book._id}`} >
    <div className="relative ">
      <img
        className="h-54 w-38 font-bold"
        src={book.ImageUrl}
        alt="Book Image"
      />
      <h3 className="font-semibold text-gray-700 " title={book?.Title}>
        {book.Title.length > 16 ? book.Title.slice(0, 14) + "..." : book.Title}
      </h3>
      <h4 className="text-xs text-gray-400 font-semibold">
        {book.Author}
      </h4>

      {types === "bestSeller" && (
        <div className="py-1 px-2 text-primary border-2 border-primary rounded-lg w-32 mt-2 text-center">
          <p>৳ {book.Price}</p>
        </div>
      )}

      {types === "topRated" && (
        <div className="text-lg font-semibold text-gray-500">
          <p>৳ {book.Price}</p>
          {ratingComp}
        </div>
      )}

      {types === "limitedOffer" && (
        <div>
          <div className="text-lg font-semibold text-gray-500 flex items-center gap-3">
            <p className="line-through text-sm">৳ {book.Price}</p>
            <p className="text-primary">৳ {book.Price}</p>
          </div>
          <div className="absolute bg-highlight text-gray-900 px-3 py-1 font-bold top-5">
            <p>{offerPercent}% OFF </p>
          </div>
        </div>
      )}
    </div>
    </Link>
  );
};

export default BookCard;
