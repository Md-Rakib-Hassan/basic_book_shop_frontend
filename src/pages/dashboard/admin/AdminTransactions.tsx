import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import {
  Search,
  Download,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Book,
  RotateCcw,
  Cross,
  CrossIcon,
  X,
  Calendar,
} from "lucide-react";
import { useGetAllTransactionsQuery } from "../../../redux/features/payment/paymentApi"; // adjust path

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, refetch } = useGetAllTransactionsQuery({
    search: searchTerm,
    status: statusFilter === "all" ? "" : statusFilter,
    dateFrom: range.from ? format(range.from, "yyyy-MM-dd") : "",
    dateTo: range.to ? format(range.to, "yyyy-MM-dd") : "",
  });

  useEffect(() => {
    refetch();
  }, [searchTerm, statusFilter, refetch, range]);

  const transactions = data?.data?.transactions || [];

  console.log(transactions);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-700" />;
      case "hold":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "refunded":
        return <RotateCcw className="h-5 w-5 text-green-700" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Transaction Timeline
        </h1>
        <p className="text-gray-600">
          Chronological list view of all customer transactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: "#1b8bcb" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent"
                  style={{ focusRingColor: "#1b8bcb" }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Hold">Hold</option>
                  <option value="Refunded">Refunded</option>
                </select>

                {/* Date Range Picker */}
                <div className="relative">
                  {/* Calendar button */}
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <Calendar className="h-5 w-5 text-gray-600" />
                    {range.from && range.to
                      ? `${format(range.from, "MMM d")} - ${format(
                          range.to,
                          "MMM d"
                        )}`
                      : "Select Date Range"}
                  </button>

                  {/* Dropdown Calendar */}
                  {showCalendar && (
                    <div className="absolute z-50 mt-2 bg-white p-4 shadow-lg rounded-lg">
                      <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={(selectedRange) => {
                          setRange(selectedRange || {});
                          if (selectedRange?.from && selectedRange?.to) {
                            setShowCalendar(false); // close after selecting range
                          }
                        }}
                        numberOfMonths={1} // shows 2 months side by side
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-4">
            {transactions.map((transaction: any) => (
              <div
                key={transaction._id}
                className={`bg-white rounded-lg shadow-md border-l-4 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  selectedTransaction?._id === transaction._id
                    ? "border-l-blue-500 shadow-lg"
                    : "border-l-gray-200"
                }`}
                onClick={() => setSelectedTransaction(transaction)}
                style={{
                  borderLeftColor:
                    selectedTransaction?._id === transaction._id
                      ? "#1b8bcb"
                      : undefined,
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {transaction.transactionId}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(transaction.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "#1b8bcb" }}
                      >
                        ৳{transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: "#1b8bcb" }}
                        >
                          {transaction.from?.ProfileImage ? (
                            <img
                              className="w-12 h-12 rounded-full"
                              src={transaction.from.ProfileImage}
                            />
                          ) : (
                            <Book></Book>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">From</div>
                      </div>

                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center">
                          <ArrowUpRight className="h-6 w-6 text-gray-400 transform rotate-45" />
                        </div>
                        <div className="border-t border-gray-200 mt-2"></div>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm">
                          {transaction.user?.ProfileImage ? (
                            <img
                              className="w-12 h-12 rounded-full"
                              src={transaction.user.ProfileImage}
                            />
                          ) : (
                            "U"
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">To</div>
                      </div>
                    </div>

                    <button
                      className="p-2 rounded-lg text-white hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: "#1b8bcb" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTransaction(transaction);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      {transaction.from?.Name || "BookNest"}
                    </span>{" "}
                    sent money to{" "}
                    <span className="font-medium">
                      {transaction.user?.Name || "User"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky -top-1">
            {selectedTransaction && (
              <X
                className="text-gray-900 absolute right-2 top-2 hover:text-red-600 hover:cursor-pointer"
                onClick={() => setSelectedTransaction(null)}
              />
            )}
            {selectedTransaction ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Transaction Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Transaction ID
                    </label>
                    <p className="text-gray-900 font-mono text-sm">
                      {selectedTransaction.transactionId}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Reference
                    </label>
                    <p className="text-gray-900">
                      {selectedTransaction.reference || "N/A"}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-500">
                      From
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedTransaction.from?.Name || "BookNest"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedTransaction.from?.Email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      To
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedTransaction.user?.Name || "User"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedTransaction.user?.Email || "N/A"}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <label className="text-sm font-medium text-gray-500">
                      Amount
                    </label>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "#1b8bcb" }}
                    >
                      ৳{selectedTransaction.amount.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Transaction Fee
                    </label>
                    <p className="text-gray-900">
                      ৳
                      {selectedTransaction.transactionFee?.toFixed(2) || "0.00"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedTransaction.status)}
                      <span className="capitalize font-medium">
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>

                  {selectedTransaction.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Description
                      </label>
                      <p className="text-gray-900">
                        {selectedTransaction.description}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select a transaction to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;
