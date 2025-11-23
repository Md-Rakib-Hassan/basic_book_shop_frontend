import { Link } from "react-router";
import StatusBadge from "./StatusBadge";
import RequesterInfo from "./RequesterInfo";
import ActionButtons from "./ActionButtons";
import { PinDisplay } from "../../pages/dashboard/user/MyBorrowRequests";

export default function RequestCard({
  request,
  onAccept,
  onReject,
  onHandover,
  onChat,
  onClaimDeposit, // ✅ new callback for claiming deposit
  Title,
  setActiveUserPopup,
  handleClaimDeposit,
}: any) {
  const isOverdue =
    request.returnDate && new Date(request.returnDate) < new Date();
  console.log(request);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      {/* Book Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div
              className={
                Title === "hide" ? "hidden" : "flex items-center space-x-3 mb-2"
              }
            >
              <Link to={`/books/${request.book._id}`}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.book.Title}
                </h3>
              </Link>
            </div>
            <StatusBadge status={request.status} />
            {Title === "hide" ? (
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    request.book.Availability === "Lend"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {request.book.Availability === "Lend"
                    ? "Borrow Request"
                    : "Purchase Request"}
                </span>
                <span className="text-lg font-bold text-primary-600">
                  ৳{request.book.Price}
                </span>
              </div>
            ) : null}
          </div>

          <div
            className={
              Title === "hide" ? "hidden" : "flex items-center space-x-2 mb-2"
            }
          >
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                request.book.Availability === "Lend"
                  ? "bg-primary-100 text-primary-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {request.book.Availability === "Lend"
                ? "Borrow Request"
                : "Purchase Request"}
            </span>
            <span className="text-lg font-bold text-primary-600">
              ৳{request.book.Price}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Requested on</p>
          <p className="font-medium">
            {new Date(request.createdAt).toLocaleDateString()}
          </p>

          {/* ✅ Return Date */}
          {request.returnDate && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Expected Return</p>
              <p
                className={`font-medium ${
                  isOverdue ? "text-red-600" : "text-green-700"
                }`}
              >
                {new Date(request.returnDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Requester Info */}
      <RequesterInfo
        requester={request.requester}
        note={request.note}
        pickupPoint={request.book.PickupPoint}
        requestInfo={request}
      />

      

      {/* Status-specific UI */}
      {request.status.toLowerCase() === "accepted" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex justify-between">
          <p className="text-sm text-green-700 mb-3">
            Accepted on {new Date(request.updatedAt).toLocaleDateString()}
          </p>
          
            { request.paymentStatus=="Released to Owner"&& (
                  <div>
                    <PinDisplay requestId={request._id} />
                  </div>
                )}
          
          {request.paymentStatus === "On Hold" && (
            <button
              onClick={onHandover}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Confirm Handover
            </button>
          )}
        </div>
      )}

      {request.status.toLowerCase() === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-800">
            <strong>
              Rejected on {new Date(request.updatedAt).toLocaleDateString()}
            </strong>
          </p>
        </div>
      )}

      {/* ✅ Overdue Action */}
      {isOverdue && request.securityDepositStatus === "Hold" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-700 mb-2">
            This book is overdue. You can claim the borrower’s deposit.
          </p>
          <button
            onClick={() => handleClaimDeposit(request)}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Claim Deposit
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <ActionButtons
        status={request.status}
        onAccept={onAccept}
        onReject={onReject}
        onChat={onChat}
        request={request}
        setActiveUserPopup={setActiveUserPopup}
      />
    </div>
  );
}
