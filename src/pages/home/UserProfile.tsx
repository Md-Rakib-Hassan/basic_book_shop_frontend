import React from 'react';
import { Star, MapPin, Phone, Mail, Calendar, DollarSign, User } from 'lucide-react';
import { useGetUserByIdQuery } from '../../redux/features/user/userApi';
import { Link, useParams } from 'react-router';
import { useGetUserReviewsQuery } from '../../redux/features/userReview/userReviewApi';
import LoadingPage from '../LoadingPage';
import { useFullUser } from '../../redux/hooks/useUserByEmail';



const UserProfile = () => {

  const {id}=useParams();
  const { data: userInfo, isLoading } = useGetUserByIdQuery(id!)
  const { data: reviewInfo, isLoading: reviewLoading } = useGetUserReviewsQuery(id!);
  const { user: currentUser } = useFullUser();

  console.log(userInfo);
  console.log(reviewInfo);
  console.log(currentUser);
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (reviewLoading || isLoading) return <LoadingPage></LoadingPage>
  
  const user = userInfo?.data;
  const reviewsData = reviewInfo?.data;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="bg-[#1b8bcb] px-6 py-8 text-center">
                <img
                  src={user?.ProfileImage}
                  alt={user?.Name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h1 className="text-2xl font-bold text-white mb-2">{user?.Name}</h1>
                <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm inline-block">
                  <User className="w-4 h-4 inline mr-1" />
                  {user?.UserType}
                </div>
              </div>

              {/* User Stats */}
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#1b8bcb] mb-1">
                      {reviewsData?.AverageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center mb-2">
                      {renderStars(Math.floor(reviewsData?.AverageRating))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {reviewsData?.TotalReviews} reviews
                    </div>
                  </div>
                </div>

                {currentUser?._id==user?._id && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">

                 <div className="text-2xl font-bold text-green-600">
                    ৳{user?.CurrentBalance.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700">Current Balance</div>
                </div>}

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#1b8bcb] mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 break-all">{user?.Email}</span>
                  </div>
                  {currentUser?._id==user?._id &&<div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#1b8bcb] mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{user?.Phone}</span>
                  </div>}
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-[#1b8bcb] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{user?.Address}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-[#1b8bcb] mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Joined {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <p className="text-gray-600 mt-1">What others are saying</p>
              </div>
              
             <div className="p-6 space-y-6">
  {reviewsData?.Reviews?.length > 0 ? (
    reviewsData.Reviews.map((review, index) => (
      <div key={review._id} className="group">
        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <img
                src={review?.ReviewerId?.ProfileImage}
                alt={review?.ReviewerId?.Name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <Link to={`/profile/${review?.ReviewerId?._id}`}>
                  <h4 className="font-semibold text-gray-900">{review?.ReviewerId?.Name}</h4>
                </Link>
                <div className="flex items-center mt-1">
                  {renderStars(review?.ReviewData?.Rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {review?.ReviewData?.Rating}/5
                  </span>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review?.ReviewData?.ReviewDate)}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed pl-16">
            "{review?.ReviewData?.Review}"
          </p>
        </div>
        {index < reviewsData?.Reviews?.length - 1 && (
          <div className="border-b border-gray-100 mt-6"></div>
        )}
      </div>
    ))
  ) : (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <Star className="w-12 h-12 text-yellow-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700">No Reviews Yet</h3>
      <p className="text-sm text-gray-500 mt-1">
        This user hasn’t received any reviews.
      </p>
    </div>
  )}
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;