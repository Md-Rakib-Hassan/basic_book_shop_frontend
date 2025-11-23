import { useState } from "react";
import { Clock } from "lucide-react";
import {
  useClaimbedDepositMutation,
  useGetIncomingRequestQuery,
  useUpdateRequestStatusMutation,
} from "../../../redux/features/request/bookRequestApi";
import { toast } from "sonner";
import RequestTabs from "../../../components/ManageBorrowRequests/RequestTabs";
import RequestCard from "../../../components/ManageBorrowRequests/RequestCard";
import LoadingPage from "../../LoadingPage";
import HandoverModal from "../../../components/ManageBorrowRequests/HandoverModal";
import { useGeneratePinMutation } from "../../../redux/features/pin/pinApi";
import UserReviewPopup from "../../../components/UserReviewPopup";
import UserReviewPopupOwner from "../../../components/UserReviewPopupOwner";


export default function ManageBorrowRequests() {
  const [activeTab, setActiveTab] = useState("all");
  const [updateRequestStatus] = useUpdateRequestStatusMutation();
  const [handoverRequestId, setHandoverRequestId] = useState<string | null>(null);
    const [activeUserPopup, setActiveUserPopup] = useState(null);
  const { data, isLoading, error,refetch } = useGetIncomingRequestQuery(null);
  const [generatePin] = useGeneratePinMutation();
  const [claimDeposit] = useClaimbedDepositMutation();
  const requests = data?.data || [];
console.log(requests);
  const handleAccept = async (id: string) => {
    toast.loading("Accepting request...");
    try {
      await updateRequestStatus({ requestId: id, status: "Accepted" }).unwrap();
      toast.success("Request accepted successfully");
    } catch {
      toast.error("Failed to update request status");
    } finally {
      toast.dismiss();
    }
  };

  const handleHandover = async(id: string) => {
    await generatePin(id);
    setHandoverRequestId(id);
    
  };
  
 
  const handleReject = async (id: string) => {
    toast.loading("Rejecting request...");
    try {
      await updateRequestStatus({ requestId: id, status: "Rejected" }).unwrap();
      toast.success("Request rejected successfully");
    } catch {
      toast.error("Failed to update request status");
    } finally {
      toast.dismiss();
    }
  };

  const handleClaimDeposit = async (reqId) => {
    console.log(reqId);
    toast.loading("Rejecting request...");
    console.log(reqId._id);
    const res = await claimDeposit({ requestId: reqId?._id }).unwrap();
    toast.dismiss();
    if (res.success) toast.success('Successfully claimed Security Deposit')
    else toast.error('Something went wrong');
    
    
  }

  

  const handleChat = (id: string) => {
    console.log("Chat with user", id);
  };

  const filtered =
    requests.filter((r: any) =>
      activeTab === "all" ? true : r.status.toLowerCase() === activeTab
    ) || [];

  if (isLoading) return <LoadingPage></LoadingPage>
  if (error)
    return <p className="text-center mt-6 text-red-600">Failed to load</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-2">Manage Borrow Requests</h1>
      <p className="text-gray-600 mb-8">Review and manage requests for your books</p>

      <RequestTabs activeTab={activeTab} setActiveTab={setActiveTab} requests={requests} />

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-gray-600">
            {activeTab === "all"
              ? "You haven't received any book requests yet"
              : `You don't have any ${activeTab} requests`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req: any) => (
            <RequestCard
              key={req._id}
              request={req}
              onAccept={() => handleAccept(req._id)}
              onReject={() => handleReject(req._id)}
              onHandover={() => handleHandover(req._id)}
              onChat={() => handleChat(req._id)}
              setActiveUserPopup={setActiveUserPopup}
              handleClaimDeposit={handleClaimDeposit}
            />
          ))}
        </div>
      )}

      {handoverRequestId && (
  <HandoverModal
    isOpen={!!handoverRequestId}
    onClose={() => setHandoverRequestId(null)}
    requestId={handoverRequestId}
/>
      )}
      
      {
        activeUserPopup&&<UserReviewPopupOwner
          isOpen={true}
          onClose={() => {
          refetch();
          setActiveUserPopup(null);
          }}
          req={activeUserPopup}
        />
      }
    </div>
  );
}
