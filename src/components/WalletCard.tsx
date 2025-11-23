import React, { useEffect, useState } from "react";
import { Wallet, Zap, Plus, DollarSign, XCircle, Minus } from "lucide-react";
import { useGetPaymentsByUserQuery } from "../redux/features/payment/paymentApi";

export default function WalletCard({ user, uuid }) {
 
    const { data: userPayments } = useGetPaymentsByUserQuery(user?._id || "", {
    skip: !user?._id,
    });
  
  console.log(userPayments);


  
  return (
    <div className="space-y-6 relative">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
      </div>


      {/* Wallet Card */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.03] z-10">


        {/* Card Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-wide">BookNest Wallet</h3>
                <p className="text-sm opacity-80">Digital Wallet</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Balance */}
          <div className="mb-6">
            <p className="text-sm opacity-80 mb-2">Current Balance</p>
            <div className="flex items-baseline space-x-2 animate-pulse">
              <span className="text-4xl font-bold">৳ {user.CurrentBalance.toFixed(2)}</span>
              <span className="text-lg opacity-80">BDT</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Cardholder</p>
              <p className="font-semibold">{user.Name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">User ID</p>
              <p className="font-mono text-sm">{uuid}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      {/* Recent Transactions */}
{/* Recent Transactions */}
<div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 backdrop-blur-md relative z-10">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>

  {(() => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const itemsPerPage = 4;

    if (!userPayments || userPayments.length === 0) {
      return <p className="text-gray-500">No transactions found.</p>;
    }

    // ✅ Step 1: Filter visible transactions only
    const visiblePayments = userPayments.filter((txn: any) => {
      if (!txn.amount || txn.amount === 0) return false;
      const isReceiver = txn.user?._id === user?._id;
      if (isReceiver && txn.status === "Hold") return false;
      return true;
    });

    if (visiblePayments.length === 0) {
      return <p className="text-gray-500">No valid transactions.</p>;
    }

    // ✅ Step 2: Slice transactions into groups of 5
    const startIndex = currentPage * itemsPerPage;
    const currentTransactions = visiblePayments.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    const totalPages = Math.ceil(visiblePayments.length / itemsPerPage);

    return (
      <div>
        <div className="space-y-3">
          {currentTransactions.map((txn: any) => {
            const currentUserId = user?._id;
            const isReceiver = txn.user?._id === currentUserId;
            const isSender = txn.from?._id === currentUserId;

            // Default values
            let Icon = Plus;
            let iconBg = "bg-green-100";
            let iconColor = "text-green-600";
            let amountColor = "text-green-600";
            let prefix = "";
            let title = "Deposit";

            if (txn.from) {
              if (isReceiver) {
                title = `Received from ${txn.from?.Name}`;
              } else if (isSender) {
                title = `Sent to ${txn.user?.Name}`;
                Icon = Minus;
                iconBg = "bg-red-100";
                iconColor = "text-red-600";
                amountColor = "text-red-600";
              }
            }

            if (txn.status === "Hold" && isSender) {
              Icon = Minus;
              iconBg = "bg-yellow-100";
              iconColor = "text-yellow-600";
              amountColor = "text-yellow-600";
              title = `On Hold (to ${txn.user?.Name})`;
            } else if (txn.status === "Refund") {
              Icon = Zap;
              iconBg = "bg-blue-100";
              iconColor = "text-blue-600";
              amountColor = "text-blue-600";
              title = `Refunded`;
              prefix = "+";
            } else if (txn.status === "Failed") {
              Icon = XCircle;
              iconBg = "bg-red-100";
              iconColor = "text-red-600";
              amountColor = "text-red-600";
              prefix = "-";
              title = "Failed Transaction";
            }
            else if (txn.status === "Withdraw") {
                Icon = Minus;
                iconBg = "bg-red-100";
                iconColor = "text-red-600";
              amountColor = "text-red-600";
              title = "Withdraw";
            }

            const date = new Date(txn.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={txn._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    {txn.status == "Refunded" ? (
                      <p className="font-medium text-gray-900">Received from BookNest</p>
                    ) : (
                      <p className="font-medium text-gray-900">{title}</p>
                    )}
                    <p className="text-sm text-gray-500">{date}</p>
                    <p className="text-xs text-gray-400">
                      Txn ID: {txn.transactionId} • Status: {txn.status}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${amountColor}`}>
                  {prefix}৳{txn.amount.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* ✅ Step 3: Carousel Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="text-sm text-gray-600">
            {startIndex + 1} - {Math.min(startIndex + itemsPerPage, visiblePayments.length)}{" "}
            of {visiblePayments.length}
          </span>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      </div>
    );
  })()}
</div>


    </div>
  );
}
