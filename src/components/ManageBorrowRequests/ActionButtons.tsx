import { MessageCircle, Star } from "lucide-react";

export default function ActionButtons({
  status,
  onAccept,
  onReject,
  onChat,
  setActiveUserPopup,
  request
}: {
  status: string;
  onAccept: () => void;
  onReject: () => void;
    onChat: () => void;
    handleActiveUserPopup: () => void;
}) {
  return (
    <div className="flex items-center justify-end space-x-3">
      {status.toLowerCase() === "pending" && (
        <>
          <button
            onClick={onReject}
            className="px-4 py-2 text-red-600 hover:text-red-700 text-sm bg-red-100 hover:bg-red-200 font-medium transition-colors rounded-lg"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
          >
            Accept Request
          </button>

          
        </>
      )}
      {!(request.ownerReviewed)&&request.status == "Completed"&&<div className="flex  items-center px-4 py-2 bg-primary-100 text-blue-700 text-sm rounded-lg hover:bg-primary-200 transition-colors gap-0.5"
                                onClick={()=>setActiveUserPopup(request)}
                                >
                                  <Star className="w-4" />
                                  <span>Review User</span>
                                </div>}
      {/* <button
        onClick={onChat}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Message User</span>
      </button> */}
    </div>
  );
}
