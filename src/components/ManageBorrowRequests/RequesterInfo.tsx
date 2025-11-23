import { User, MapPin, Contact, Phone, Star } from "lucide-react";

export default function RequesterInfo({
  requester,
  note,
  pickupPoint,
  requestInfo,
}: any) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={requester.ProfileImage}
          alt={requester.Name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900">{requester.Name}</h4>
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-3 h-3 mr-1" />
              <span>Rating N/A</span>
            </div>
            
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2 justify-between">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                Pickup:{" "}
                {pickupPoint?.Name + " | " + pickupPoint?.Address || "N/A"}
              </span>
            </span>
            <span
              className={`px-2 py-1 text-xs sm:text-sm font-medium rounded-full capitalize ${
                requestInfo.paymentStatus === "Paid"
                  ? "bg-green-100 text-green-800"
                  : requestInfo.paymentStatus === "Completed"
                  ? "bg-blue-100 text-primary-700"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              Payment: {requestInfo.paymentStatus}
            </span>
          </div>
          {requestInfo.paymentStatus==="On Hold"&&<span className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="w-4 h-4 mr-1" />
              <span>
                Contact:  {requester.Phone}
              </span>
            </span>}
          <p className="text-sm text-gray-700 italic">"{note}"</p>
        </div>
      </div>
    </div>
  );
}
