import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  CreditCard,
  QrCode,
  Download,
  MapPin,
  Shield,
  DollarSign,
  RotateCcw,
  X,
  Wallet,
  AlertCircle,
  PlusCircle,
  Star,
} from "lucide-react";
import {
  useDeleteRequestMutation,
  useGetMyRequestQuery,
  useUpdatePaymentStatusMutation,
} from "../../../redux/features/request/bookRequestApi";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  useGeneratePinMutation,
  useGetPinQuery,
} from "../../../redux/features/pin/pinApi";
import { useFullUser } from "../../../redux/hooks/useUserByEmail";
import { toast } from "sonner";
import HandoverModal from "../../../components/ManageBorrowRequests/HandoverModal";
import { showConfirm } from "../../../components/ui/Confirm Modal/ConfirmDialog";
import BookReviewPopup from "../../../components/BookReviewPopup";
import UserReviewPopup from "../../../components/UserReviewPopup";
import LoadingPage from "../../LoadingPage";

export default function MyBorrowRequests() {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "accepted" | "rejected" | "completed"
  >("all");
  const {
    data: myRequestData,
    isLoading: isMyRequestLoading,
    refetch,
  } = useGetMyRequestQuery(null);
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [generatePin] = useGeneratePinMutation();
  const [deleteRequest] = useDeleteRequestMutation();
  const [handoverRequestId, setHandoverRequestId] = useState<string | null>(
    null
  );
  const [activePopup, setActivePopup] = useState(null);
  const [activeUserPopup, setActiveUserPopup] = useState(null);
  const { user } = useFullUser();
  const requests =
    myRequestData?.data?.map((req: any) => ({
      id: req._id,
      bookTitle: req.book?.Title,
      author: req.book?.Author,
      owner: req.book?.BookOwner?.Name,
      ownerInfo:req.book?.BookOwner,
      ownerContact: req.book?.BookOwner?.Phone || "Not provided",
      status: req.status.toLowerCase(),
      pickupLocation: req.book?.PickupPoint?.Address || "Not provided",
      Latitude: req.book?.PickupPoint?.Latitude || null,
      Longitude: req.book?.PickupPoint?.Longitude || null,
      paymentStatus: req.paymentStatus, // Assuming payment status is pending by default
      isReviewedBook: req.isReviewedBook,
      requestDate: req.createdAt,
      returnDate: req.returnDate,
      requesterReviewed: req.requesterReviewed,
      bookinfo: req.book,
      returnedAt: req.returnedAt,
      price: req.book?.Price ? `${req.book.Price}` : null,
      ActualPrice: req.book?.ActualPrice || 0,
      deposit: req.securityDepositAmount,
      bookFor: req.bookFor,
      securityDepositStatus: req.securityDepositStatus,
      type: req.book?.Availability?.toLowerCase(),
      rejectionReason:
        req.status === "Rejected" ? "Book owner rejected your request" : null,
      pickupTime: null,
      qrCode: null,
    })) || [];

  console.log(myRequestData);

  const filteredRequests = requests.filter((request: any) =>
    activeTab === "all" ? true : request.status === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (isMyRequestLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Clock className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const handlePayNow = (request: any) => {
    console.log(request);
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleReturnBook = async (id: any) => {
    await generatePin(id);
    setHandoverRequestId(id);
  };

  const handleConfirmPayment = async () => {
    // 🔹 Place API call here to process payment
    console.log("Payment confirmed for:", selectedRequest);
    const res = await updatePaymentStatus({ requestId: selectedRequest.id });
    console.log(res);
    if (res.data.success) {
      toast.success("Payment Successful");
    } else {
      toast.error("Something went wrong");
    }
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleCancelRequest = async (id) => {
    showConfirm({
      title: "Want to Cancel the Request?",
      message: "This action cannot be undone.",
      onConfirm: async () => {
        try {
          toast.loading("Canceling request...");
          await deleteRequest(id).unwrap();
          toast.dismiss();
          toast.success("Request canceled successfully");
        } catch (error) {
          toast.dismiss();
          toast.error("Failed to cancel request. Please try again.");
        }
      },
      onCancel: () => {
        toast.info("Request cancelation cancelled");
      },
    });
  };

  const handleCancelPayment = () => {
    setShowModal(false);
    toast.info("Payment Cancelled");
    setSelectedRequest(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          My Borrow Requests
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Track your book requests and manage pickups
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8">
            {[
              { id: "all", label: "All Requests" },
              { id: "pending", label: "Pending" },
              { id: "accepted", label: "Accepted" },
              { id: "rejected", label: "Rejected" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap py-2 px-2 sm:px-1 border-b-2 font-medium text-sm sm:text-base transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                <span className="ml-1 sm:ml-2 px-2 py-1 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-full">
                  {
                    requests.filter(
                      (r: any) => tab.id === "all" || r.status === tab.id
                    ).length
                  }
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {activeTab === "all"
                ? "You haven't made any book requests yet"
                : `You don't have any ${activeTab} requests`}
            </p>
          </div>
        ) : (
          filteredRequests.map((request: any) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      {request.bookTitle}
                    </h3>
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 text-xs sm:text-sm font-medium rounded-full ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      <span className="capitalize">{request.status}</span>
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-1 truncate">
                    by {request.author}
                  </p>
                  <div className=" flex items-center gap-2">
                    <p className="text-gray-500 text-xs sm:text-sm truncate">
                      Owner: {request.owner}
                    </p>

                    {!(request.requesterReviewed)&&<div className="flex  items-center px-2 py-1 text-xs sm:text-sm font-medium rounded-full capitalize bg-primary-100 text-primary-600 gap-0.5"
                    onClick={() => setActiveUserPopup(request)}
                    >
                      <Star className="w-4" />
                      <span>Review</span>
                    </div>}
                  </div>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Requested on
                  </p>
                  <p className="font-medium text-sm sm:text-base">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>

                  {request.returnDate && !request.returnedAt && (
                    <div className="mt-2">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Return by
                      </p>
                      <p className="font-medium text-sm sm:text-base text-red-600">
                        {new Date(request.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {request.returnedAt && (
                    <div className="mt-2">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Returned on
                      </p>
                      <p className="font-medium text-sm sm:text-base text-green-600">
                        {new Date(request.returnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {request.price && (
                    <p className="text-base sm:text-lg font-bold text-primary-600 mt-1">
                      ৳{request.price}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Pickup Location
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {request.pickupLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Type</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {request.type}
                  </p>
                </div>
                {request.status === "accepted" &&
                  request.paymentStatus == "On Hold" && (
                    <div>
                      <PinDisplay requestId={request.id} />
                    </div>
                  )}
              </div>

              {/* Status-specific content */}
              {request.status === "rejected" && request.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm sm:text-base">
                  <p className="text-red-800">
                    <strong>Rejection reason:</strong> {request.rejectionReason}
                  </p>
                </div>
              )}

              {request.status === "accepted" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <p className="font-medium text-green-800 mb-2 sm:mb-0">
                      Request Accepted!
                      {(request.paymentStatus === "On Hold" ||
                        request.paymentStatus === "Released to Owner") && (
                        <p className="font-bold">
                          Contact: {request?.ownerContact}
                        </p>
                      )}
                    </p>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full capitalize ${
                          request.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : request.paymentStatus === "Completed"
                            ? "bg-blue-100 text-primary-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        Payment: {request.paymentStatus}
                      </span>

                      {request?.securityDepositStatus == "Hold" && (
                        <span
                          className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full capitalize bg-red-100 text-red-500`}
                        >
                          Deposit: ৳{request.deposit}
                        </span>
                      )}

                      {request?.securityDepositStatus == "Refunded" && (
                        <span
                          className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full capitalize bg-green-100 text-green-800`}
                        >
                          Deposit: Refunded
                        </span>
                      )}
                    </div>
                  </div>
                  {/* {request.pickupTime && request.paymentStatus === "paid" && (
                    <div className="space-y-2">
                      <p className="text-green-700 text-sm sm:text-base">
                        <strong>Pickup scheduled:</strong>{" "}
                        {new Date(request.pickupTime).toLocaleString()}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        <button className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                          <QrCode className="w-4 h-4" />
                          <span>Show QR Code</span>
                        </button>
                        <button className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Download Receipt</span>
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              )}

              {/* ✅ Overdue Notice */}
              {request.returnDate &&
                new Date(request.returnDate) < new Date() &&
                request.status === "accepted" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm sm:text-base">
                    <p className="text-red-800 font-medium">
                      ⚠️ This book is overdue! Please return it as soon as
                      possible to avoid losing your deposit.
                    </p>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                {(request.status === "pending" ||
                  request.status === "accepted") &&
                  (request.paymentStatus == "Pending" ||
                    request.paymentStatus == "On Hold") && (
                    <button
                      className="px-4 py-2 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => handleCancelRequest(request.id)}
                    >
                      Cancel Request
                    </button>
                  )}
                {request.status === "accepted" &&
                  request.paymentStatus === "Pending" && (
                    <button
                      onClick={() => handlePayNow(request)}
                      className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Now</span>
                    </button>
                  )}

                {request.status === "accepted" &&
                  request.paymentStatus === "Released to Owner" && (
                    <button
                      onClick={() => handleReturnBook(request.id)}
                      className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Return Book</span>
                    </button>
                  )}
                {request.status == "completed" && !(request.isReviewedBook) && (
                  <button
                    onClick={() => setActivePopup(request)}
                    className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span>Review Book</span>
                  </button>
                )}

                {request.Latitude &&
                  request.Longitude &&
                  request.status !== "rejected" && (
                    <a
                      href={`https://www.google.com/maps?q=${request.Latitude},${request.Longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>View on Map</span>
                    </a>
                  )}

                {/* <button className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Owner</span>
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-[460px] relative"
          >
            {/* Close button */}
            <button
              onClick={handleCancelPayment}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Payment Summary
            </h2>

            {/* Book Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 shadow-inner">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Book:</span>{" "}
                {selectedRequest.bookTitle}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Author:</span>{" "}
                {selectedRequest.author}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Owner:</span>{" "}
                {selectedRequest.owner}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Pickup:</span>{" "}
                {selectedRequest.pickupLocation}
              </p>
            </div>

            {/* Wallet Balance */}
            <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg mb-6">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-yellow-600" />
                <span className="text-gray-800 font-medium">
                  Your Wallet Balance
                </span>
              </div>
              <span className="text-yellow-700 font-bold">
                ৳{user.CurrentBalance}
              </span>
            </div>

            {/* Payment Breakdown */}
            <div className="space-y-4 mb-6">
              {/* Deposit */}
              {selectedRequest.bookFor == "Lend" && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-800 font-medium">
                      Security Deposit (Hold)
                    </span>
                  </div>
                  <span className="text-blue-600 font-bold">
                    ৳{selectedRequest.ActualPrice}
                  </span>
                </motion.div>
              )}

              {/* Deduction */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between bg-red-50 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-red-600" />
                  <span className="text-gray-800 font-medium">
                    Book Price (Deducted)
                  </span>
                </div>
                <span className="text-red-600 font-bold">
                  -৳{selectedRequest.price}
                </span>
              </motion.div>

              {/* Refund */}
              {selectedRequest.bookFor == "Lend" && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between bg-green-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-green-600" />
                    <span className="text-gray-800 font-medium">
                      Refund on Return
                    </span>
                  </div>
                  <span className="text-green-600 font-bold">
                    +৳{selectedRequest.ActualPrice - selectedRequest.price}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Balance Projection */}
            {user.CurrentBalance >= selectedRequest.ActualPrice && (
              <div className="bg-gray-50 border rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">
                    Your balance after{" "}
                    {selectedRequest.bookFor == "Lend" ? "deposit" : "payment"}{" "}
                    hold will be:
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ৳
                  {selectedRequest.bookFor == "Lend"
                    ? user.CurrentBalance - selectedRequest.ActualPrice
                    : user.CurrentBalance - selectedRequest.price}
                </p>
              </div>
            )}

            {/* Insufficient Balance Warning */}
            {user.CurrentBalance < selectedRequest.ActualPrice && (
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Insufficient balance. Please add money to your wallet.
                  </span>
                </div>
                <Link to={"/dashboard/wallet"} className="w-full">
                  <button className="flex w-full items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md cursor-pointer">
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Money</span>
                  </button>
                </Link>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelPayment}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={user.CurrentBalance < selectedRequest.ActualPrice}
                className={`px-5 py-2 rounded-lg shadow-md transition-all ${
                  user.CurrentBalance < selectedRequest.ActualPrice
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-500 to-indigo-500 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Render active popup */}
      {activePopup && (
        <BookReviewPopup
          isOpen={true}
          onClose={() => {
            refetch();
            setActivePopup(null);
          }}
          req={activePopup}
        />
      )}

      {
        activeUserPopup&&<UserReviewPopup
          isOpen={true}
          onClose={() => {
            refetch();
          setActiveUserPopup(null);
          }}
          req={activeUserPopup}
        />
      }

      {handoverRequestId && (
        <HandoverModal
          isOpen={!!handoverRequestId}
          onClose={() => setHandoverRequestId(null)}
          requestId={handoverRequestId}
          mode="return"
        />
      )}
    </div>
  );
}

export function PinDisplay({ requestId }: { requestId: string }) {
  const { data, isLoading, isError } = useGetPinQuery(requestId);
  console.log(data);
  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <>
      {data?.data?.pin && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Verification Pin
          </p>
          <p className="text-sm font-bold text-green-700 tracking-widest">
            {data?.data?.pin}
          </p>
        </div>
      )}
    </>
  );
}
