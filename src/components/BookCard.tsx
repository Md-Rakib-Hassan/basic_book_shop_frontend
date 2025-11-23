import { Star, MapPin, Eye } from "lucide-react";
import { Link } from "react-router";
import { distanceKm } from "../utils/DistanceKm";
import { useUserLocation } from "../context/UserLocationContext";



const BookCard = ({ book}) => {
  const rating: number = book.Rating || 0; // fallback
  const { lat, lng } = useUserLocation();
  return (
    <Link to={`/books/${book._id}`}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Book Image */}
        <div className="aspect-w-3 aspect-h-4 relative">
          <img
            src={book.ImageUrl}
            alt={book.Title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          {/* Availability & Condition badges */}
          <div>
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {book.Price == 0 && (
  <span className="px-3 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
    Free
  </span>
)}

              
              {book.Availability && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  book.Availability.toLowerCase() === "sell"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {book.Availability.toLowerCase() === "sell"?"Buy":"Borrow"}
              </span>
            )}
            
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-1">

            {book.Condition && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  book.Condition.toLowerCase() === "new"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {book.Condition}
              </span>
            )}
            </div>

          </div>
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{book.Title}</h3>
          <p className="text-sm text-gray-600 mb-2">by {book.Author}</p>

          <div className="flex items-center justify-between mb-1">
            {book.Category && book.Subject?<span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              {book.Subject}
                </span>:<span className="text-sm text-gray-500">{book.Category}</span>}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          {book?.Institution && <p className="text-sm text-gray-600 mb-2">{book.Institution}</p>}

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-sm text-gray-500">
              {book?.PickupPoint?.Latitude!= null && (
                <>
                  <MapPin className="w-4 h-4 mr-1" />
                  {distanceKm(lat,lng,book?.PickupPoint?.Latitude,book?.PickupPoint?.Longitude).toFixed(2)} km away
                </>
              )}
            </div>
            {(
              <span className="text-lg font-bold text-primary-600">৳ {book.Price||0}</span>
            )}
          </div>

          {book.BookOwner && (
            <div className="mb-3">
              <p className="text-sm text-gray-600">Owner: {book.BookOwner.Name}</p>
              {book?.Semester && <p className="text-xs text-gray-600 mb-2">Semester: {book.Semester}</p>}
            </div>
          )}

          <button
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
