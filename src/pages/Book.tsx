import React, { use, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import {
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  ShoppingCart,
  BookOpen,
  User,
  Tag,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  useGetBookQuery,
  useGetSpecificBookQuery,
  useUpdateBookRatingMutation,
} from "../redux/features/books/bookApi";
import BookReview from "../components/BookReview";
import BookTable from "../components/BookTable";
import LoadingPage from "./LoadingPage";
import RequestModal from "../components/ui/Confirm Modal/RequestModal";
import {
  useCreateRequestMutation,
  useGetMyRequestQuery,
  useGetRequestByUserAndBookQuery,
} from "../redux/features/request/bookRequestApi";
import { toast } from "sonner";
import { distanceKm } from "../utils/DistanceKm";
import { useUserLocation } from "../context/UserLocationContext";
import { FaQuestionCircle } from "react-icons/fa";
import { useFullUser } from "../redux/hooks/useUserByEmail";

export default function Book() {
  const { bookId } = useParams<{ bookId: string }>();
  const { isLoading, currentData } = useGetSpecificBookQuery(bookId!);
  const [RatingUpdate] = useUpdateBookRatingMutation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [requestBook] = useCreateRequestMutation();
  const { user } = useFullUser();
  const { data: bookHistoryData, isLoading: isHistoryLoading } =
    useGetRequestByUserAndBookQuery(bookId!);
  console.log(currentData);
  const { data: myRequestData, isLoading: isMyRequestLoading } =
    useGetMyRequestQuery(bookId!);

  const { isLoading: issimbookLoading, currentData: simbook } = useGetBookQuery(
    [{ name: "category", value: currentData?.data?.Category }]
  );

  const { lat, lng } = useUserLocation();

  useEffect(() => {
    if (currentData && mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: currentData?.data?.PickupPoint.Latitude,
          lng: currentData?.data?.PickupPoint.Longitude,
        },
        zoom: 15,
      });
      new window.google.maps.Marker({
        position: {
          lat: currentData?.data?.PickupPoint.Latitude,
          lng: currentData?.data?.PickupPoint.Longitude,
        },
        map,
      });
    }
  }, [currentData]);

  useEffect(() => {
    const book = currentData?.data;
    if (book && book.Rating !== book?.Reviews?.AverageRating) {
      RatingUpdate({
        bookId: book._id,
        rating: book.Reviews.AverageRating,
      })
        .unwrap()
        .then(() => {
          console.log("Book rating updated successfully");
        })
        .catch((err) => {
          console.error("Failed to update book rating:", err);
        });
    }
  }, [currentData, RatingUpdate]);

  if (
    isLoading ||
    !currentData ||
    isHistoryLoading ||
    isMyRequestLoading ||
    issimbookLoading
  ) {
    return <LoadingPage></LoadingPage>;
  }
  console.log("Book History Data:", bookHistoryData);
  const handleRequest = async (note: string) => {
    try {
      toast.loading("Sending request...");
      setShowModal(false);
      await requestBook({
        bookId,
        note,
        BookOwner: book?.BookOwner?._id,
      }).unwrap();
      toast.dismiss();
      toast.success("Request sent successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to send request. Please try again.");
    }
  };

  const book = currentData?.data;
  const similarBooks = simbook?.data?.slice(0, 5) || [];
  //   console.log(currentData);
  //  console.log(myRequestData);

  //   console.log( simbook);
  console.log("Similar Books:", similarBooks);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Info */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Book Image */}
              <div>
                <img
                  src={book.ImageUrl}
                  alt={book.Title}
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>

              {/* Book Details */}
              <div>
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${
                      book.Availability === "Lend"
                        ? "bg-primary-100 text-primary-700"
                        : "bg-secondary-100 text-secondary-700"
                    }`}
                  >
                    {book.Availability === "Lend"
                      ? "Available for Borrowing"
                      : "For Sale"}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {book.Title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">by {book.Author}</p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </span>
                  <span className="ml-2 text-gray-600 text-base ">
                    Added on:
                  </span>
                  <span className="ml-2 text-gray-600 text-base font-medium">
                    {new Date(book.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 text-gray-400 mr-2" />
                    {book.Category && book.Subject ? (
                      <span className="text-base text-gray-600">
                        {book.Subject}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {book.Category}
                      </span>
                    )}
                  </div>
                  {book?.Institution && (
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        Institution:{" "}
                        <span className="font-medium">{book.Institution}</span>
                      </span>
                    </div>
                  )}
                  {book?.Semester && (
                    <div className="flex items-center">
                      <span className="text-gray-600">
                        Semester:{" "}
                        <span className="font-medium">{book.Semester}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-gray-600">
                      Condition:{" "}
                      <span className="font-medium">{book.Condition}</span>
                    </span>
                  </div>
                  {book.Availability === "Lend" && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="relative group">
                        <FaQuestionCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
                        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block w-56 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                          A security deposit is required when your request is
                          accepted. It will be returned after the book is
                          returned, with only the borrowing fee deducted. If the
                          book isn’t returned, the deposit covers its cost. You
                          must have enough balance to request the book.
                        </span>
                      </span>

                      <span>
                        :{" "}
                        <span className="bg-yellow-100 text-yellow-800 font-semibold px-1 rounded">
                          {" "}
                          ৳{book?.ActualPrice || 0}
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      Published {book.PublishedYear}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                    <span className="font-medium">
                      {book.Reviews.AverageRating}
                    </span>
                    <span className="text-gray-600 ml-1">
                      ({book.Reviews.TotalReviews} reviews)
                    </span>
                  </div>
                </div>

                {
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-primary-600">
                      ৳{book.Price || 0}
                    </span>
                  </div>
                }

                {/* Action Buttons */}
                {book?.BookOwner?._id!=user?._id&&<div>

                  {book?.ActualPrice > user?.CurrentBalance ? (
                  <div className="mt-4 flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="font-medium">
                      Sorry, you don’t have sufficient balance.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowModal(true)}
                      disabled={
                        bookHistoryData?.data?.status == "Pending" ||
                        isHistoryLoading
                      } // disable while loading
                      className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors
      ${
        bookHistoryData?.data?.status == "Pending" || isHistoryLoading
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-primary-500 text-white hover:bg-primary-600"
      }`}
                    >
                      {book.Availability === "Lend" ? (
                        <>
                          <BookOpen className="w-5 h-5" />
                          {bookHistoryData?.data?.status == "Pending" ||
                          isHistoryLoading ? (
                            <span>Request Pending</span>
                          ) : (
                            <span>Request to Borrow</span>
                          )}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          {bookHistoryData?.data?.status == "Pending" ||
                          isHistoryLoading ? (
                            <span>Request Pending</span>
                          ) : (
                            <span>Request to Buy</span>
                          )}
                        </>
                      )}
                    </button>
                    {/* <button
                    // onClick={onChat}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Message Owner</span>
                  </button> */}
                  </div>
                )}
                </div>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {showFullDescription
                ? book.Description
                : `${book.Description.slice(0, 300)}...`}
              <button
                className="ml-2 text-blue-600 font-medium"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </p>
          </div>

          {/* Pickup Location */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Pickup Location
            </h2>
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">
                {book.PickupPoint.Name}
              </h3>
              <p className="text-gray-600">{book.PickupPoint.Address}</p>
            </div>
            <div ref={mapRef} className="h-96 rounded-lg" />
          </div>

          <BookTable bookDetails={currentData}></BookTable>
          {/* Reviews */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <BookReview bookReview={book?.Reviews}></BookReview>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner Info */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Book Owner
            </h2>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={book.BookOwner.ProfileImage}
                alt={book.BookOwner.Name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <Link to={`/profile/${book.BookOwner._id}`}><h3 className="font-medium text-gray-900">
                  {book.BookOwner.Name}
                </h3></Link>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1 " />
                  <span className="capitalize">{book.BookOwner.UserType} </span>
                </div>
              </div>
            </div>
            {/* <div className="space-y-2 text-sm text-gray-600">
              <p>Address: {book.BookOwner.Address}</p>
              <p>Phone: {book.BookOwner.Phone}</p>
            </div> */}
          </div>

          {/* Similar Books */}
          <div className="bg-white/30 rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Similar Books
            </h2>
            <div className="space-y-4">
              {similarBooks.map(
                (similar) =>
                  bookId != similar._id && (
                    <Link to={`/books/${similar._id}`} key={similar._id}>
                      <div
                        key={similar._id}
                        className="flex items-center space-x-3 my-6"
                      >
                        <img
                          src={similar.ImageUrl}
                          alt={similar.Title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                            {similar.Title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {similar.Author}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-medium text-primary-600">
                              ৳ {similar.Price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {distanceKm(
                                lat,
                                lng,
                                similar.PickupPoint.Latitude,
                                similar.PickupPoint.Longitude
                              ).toFixed(2)}{" "}
                              KM away
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <RequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRequest}
        type={book.Availability === "Lend" ? "borrow" : "buy"}
      />
    </div>
  );
}
