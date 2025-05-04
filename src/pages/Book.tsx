
import { Link, useParams } from "react-router";
import { useGetSpecificBookQuery } from "../redux/features/books/bookApi";
import LoadingPage from "./LoadingPage";
import { SpecificBookApiResponse } from "../types";

import { useState } from "react";
import BookTable from "../components/BookTable";
import BookReview from "../components/BookReview";
import Rating from "../components/Rating";

const Book = () => {
  const { bookId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [qty, setQty] = useState(1);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleQtyIncrement = () => {setQty((prev)=>(prev<apiResponse?.data?.StockQuantity?prev+1:prev)) }
  const handleQtyDecrement = () => { setQty((prev) => (prev > 1 ? prev - 1 : prev))};

  //console.log(bookId);
  const { isLoading, currentData } = useGetSpecificBookQuery(bookId);
  const apiResponse = currentData as SpecificBookApiResponse;
  if (isLoading) return <LoadingPage></LoadingPage>;
  const { Title, Author, Price,  Description,  Reviews,ImageUrl } = apiResponse?.data ?? {};
 // console.log(currentData);

  
  return (
    <div className="w-[80%] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mt-16">
        <div className="w-1/4">
          <img src={ImageUrl} alt="" className="w-full" />
        </div>

        <div className="text-gray-400 text-md flex flex-col gap-2 w-[60%] pl-6 relative">
          <h1 className="text-2xl font-semibold text-gray-700">
            {Title}
          </h1>
          <p className="">Author: {Author.Name}</p>
          <Rating rating={Reviews?.AverageRating} TotalReviews={Reviews.TotalReviews}></Rating>
          {/* <p className=''>৳ {Price}</p>
           */}
          <div className="py-1 px-2 text-primary-500 border-2 border-primary-500 rounded-lg w-26 mt-2 text-center">
            <p>৳ {Price}</p>
          </div>
          <p
            className={`text-justify overflow-hidden transition-all duration-500 ${
              isExpanded ? "max-h-full" : "max-h-30"
            }`}
          >
            {Description}
          </p>

          <p
            className="text-primary-500 font-medium pl-6 text-sm cursor-pointer"
            onClick={toggleExpand}
          >
            {isExpanded ? "View Less" : "View More"}
          </p>

          <div className="flex justify-end items-center mt-4 px-6 gap-12">
            <div className="flex items-center gap-2">
              <button onClick={handleQtyDecrement} className= {`border-2 px-2 rounded-full cursor-pointer ${qty <= 1 ? "opacity-50 cursor-not-allowed" : ""}`} >
                -
              </button>
              <span className="text-gray-500 font-semibold border-2  px-6 rounded-full ">
                {qty}
              </span>
              <button className={` border-2 px-2 rounded-full cursor-pointer ${qty >= apiResponse?.data?.StockQuantity ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleQtyIncrement}>
                +
              </button>
            </div>
            <div>
              <Link to={`/checkout/${bookId}?qty=${qty}`}><button className="bg-primary-500 text-white px-4 py-2 rounded-4xl shadow-sm shadow-primary-400 hover:bg-primary-600 transition duration-300 hover:shadow-lg cursor-pointer">
                {/* Add to Cart */}
                Buy Now
              </button></Link>
            </div>
          </div>
        </div>
      </div>
      <BookTable bookDetails={apiResponse}></BookTable>
      <BookReview bookReview={Reviews}></BookReview>
    </div>
  );
};

export default Book;
