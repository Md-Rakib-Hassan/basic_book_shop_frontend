import { Clock, CheckCircle, XCircle } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "accepted": return "bg-green-100 text-green-800";
    case "rejected": return "bg-red-100 text-red-800";
    case "completed": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return <Clock className="w-4 h-4" />;
    case "accepted": return <CheckCircle className="w-4 h-4" />;
    case "completed": return <CheckCircle className="w-4 h-4" />;
    case "rejected": return <XCircle className="w-4 h-4" />;
    default: return null;
  }
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span className="capitalize">{status}</span>
    </span>
  );
}
