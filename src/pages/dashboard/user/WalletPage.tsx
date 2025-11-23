import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Plus,
  ArrowLeft,
  Zap,
  DollarSign,
  Wallet,
} from "lucide-react";
import { useFullUser } from "../../../redux/hooks/useUserByEmail";
import { useGetPaymentsByUserQuery, useInitPaymentMutation, useWithdrawMutation } from "../../../redux/features/payment/paymentApi";
import WalletCard from "../../../components/WalletCard";
import { toast } from "sonner";

export default function WalletPage() {
  const { user, isLoading } = useFullUser();
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "withdraw">("add");
  const [initPayment] = useInitPaymentMutation();
  const [withdraw] = useWithdrawMutation();

  const quickAmounts = [100, 250, 500, 1000, 2000];
  console.log(user);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-red-600 mt-8">
        Failed to load user information.
      </p>
    );
  }

  const uuid = `USR-${user._id.slice(0, 10).toUpperCase()}`;

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) return;

    if (activeTab == 'add') {
      const CustomerDetails = {
      Name: user?.Name,
      Address: user?.Address,
      Phone: user?.Phone,
      rechargeAmount: parseFloat(rechargeAmount),
      userId: user?._id,
    };

    try {
      const response = await initPayment(CustomerDetails).unwrap();
      window.location.replace(response?.url);
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
    }
    else {
      if (parseFloat(rechargeAmount) > parseFloat(user?.CurrentBalance)) {
        return toast.error("Sorry you don't have sufficient money.")
      }
      try {
        toast.loading('Withdraw Processing')
        const resp = await withdraw({ amount: parseFloat(rechargeAmount) });
        toast.dismiss();
        toast.success('Withdraw Completed');
      
      }
      catch (err) {
        toast.error('Something went wrong');
    
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600">Manage your wallet with ease</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wallet Card + Transactions */}
        <div className="space-y-6">
          {/* Wallet Card */}
          <WalletCard user={user} uuid={uuid} />
        </div>

        {/* Tabs: Add / Withdraw */}
        <div className="space-y-6">
          {/* Tab Headers */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-2 font-medium ${
                activeTab === "add"
                  ? "border-b-2 border-primary-500 text-primary-600"
                  : "text-gray-500"
              }`}
            >
              Add Money
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`px-4 py-2 font-medium ${
                activeTab === "withdraw"
                  ? "border-b-2 border-primary-500 text-primary-600"
                  : "text-gray-500"
              }`}
            >
              Withdraw
            </button>
          </div>

          {/* Form (shared design, only heading/button changes) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {activeTab === "add" ? "Add Money" : "Withdraw"}
            </h2>

            <form onSubmit={handleRecharge} className="space-y-6">
              {/* Quick Amounts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quick Select
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setRechargeAmount(amount.toString())}
                      className={`p-3 text-center border rounded-lg transition-colors ${
                        rechargeAmount === amount.toString()
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      ৳ {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" >
                    ৳
                    </span>
                  <input
                    type="number"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg  ">
                    <CreditCard className="w-5 h-5 text-gray-400 ml-3 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Credit/Debit Card
                      </div>
                      <div className="text-sm text-gray-500">
                        Visa, Mastercard, etc.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg  ">
                    
                    <Smartphone className="w-5 h-5 text-gray-400 ml-3 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Mobile Wallet
                      </div>
                      <div className="text-sm text-gray-500">
                        bKash, Nagad, Rocket
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !rechargeAmount || parseFloat(rechargeAmount) <= 0 || isProcessing
                }
                className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>
                      {activeTab === "add"
                        ? `Recharge ৳${rechargeAmount || "0"}`
                        : `Withdraw ৳${rechargeAmount || "0"}`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-medium text-blue-900 mb-2">Secure & Protected</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 256-bit SSL encryption</li>
              <li>• PCI DSS compliant payment processing</li>
              <li>• Instant balance updates</li>
              <li>• 24/7 fraud monitoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
