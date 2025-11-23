import React, { useState } from 'react';
import { Star, X, User, Send } from 'lucide-react';
import { toast } from 'sonner';
import { usePostUserReviewMutation } from '../redux/features/userReview/userReviewApi';


const UserReviewPopup = ({ isOpen, onClose, req }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
    const [postReview] = usePostUserReviewMutation();
    console.log(req);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Posting user review...");

    const res = await postReview({
        userId:req.ownerInfo?._id,
        data: {
        RequestId:req.id,
        ReviewData: {
          Rating: rating,
          Review: review,
          ReviewDate: new Date(),
        },
      },
    })

    toast.dismiss();
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message || "Failed to post review");
    }
    onClose();
  };

  const renderStars = (interactive = true, size = 'w-6 h-6') => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} cursor-pointer transition-all duration-200 ${
            star <= (hoveredRating || rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={() => interactive && setRating(star)}
          onMouseEnter={() => interactive && setHoveredRating(star)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
        />
      ))}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg transform transition-all duration-300 shadow-2xl">
        <div className="flex items-start space-x-4 mb-6">
          {req?.ownerInfo?.ProfileImage ? (
            <img
              src={req?.ownerInfo?.ProfileImage}
              alt={req?.ownerInfo?.Name}
              className="w-20 h-20 rounded-full border shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md">
              <User className="w-10 h-10 text-gray-500" />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Rate {req?.userInfo?.name || "this User"}
            </h2>
            <p className="text-gray-600">Share your experience with this user</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <div className="mb-3">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                How would you rate this user?
              </label>
              <div className="flex justify-center">
                {renderStars(true, 'w-8 h-8')}
              </div>
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 animate-fade-in">
                {rating === 1 && "Very bad experience"}
                {rating === 2 && "Not good"}
                {rating === 3 && "Okay"}
                {rating === 4 && "Good experience"}
                {rating === 5 && "Excellent!"}
              </p>
            )}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 resize-none focus:ring-primary w-full"
            placeholder="Write your review about this user..."
            maxLength={500}
          />

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 text-white rounded-2xl font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 bg-primary"
            >
              <Send className="w-4 h-4" />
              <span>Publish</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserReviewPopup;
