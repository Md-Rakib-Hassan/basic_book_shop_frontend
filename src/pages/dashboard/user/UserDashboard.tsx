import React, { useState } from 'react';
import { 
  Book, 
  Clock, 
  DollarSign, 
  MapPin, 
  User, 
  Bell, 
  CreditCard,
  Star
} from 'lucide-react';
import { useFullUser } from '../../../redux/hooks/useUserByEmail';
import { useGetMyBooksQuery } from '../../../redux/features/books/bookApi';
import { useGetIncomingRequestQuery, useGetMyRequestQuery } from '../../../redux/features/request/bookRequestApi';
import { useGetPaymentsByUserQuery } from '../../../redux/features/payment/paymentApi';
import { useGetSpecificPickupPointQuery } from '../../../redux/features/pickup/pickupApi';
import { Link } from 'react-router';





function UserDashboard() {

    const {user} = useFullUser();

  
    const { data:mybook } = useGetMyBooksQuery(null);
    const { data: incoming_request } = useGetIncomingRequestQuery(null) 
  const { data: myPayment } = useGetPaymentsByUserQuery(user._id);
  const { data: myrequest } = useGetMyRequestQuery(null);
    const { data: myPickup } =useGetSpecificPickupPointQuery(user?._id ?? "", {
          skip: !user?._id,
        });
  const { data: myBookRequest } = useGetMyRequestQuery(null);


const myBooks = mybook?.data||[];
const incomingRequests = incoming_request?.data||[];
const myRequests = myrequest?.data||[];
const payments = myPayment||[];
const pickupPoints = myPickup?.data||[];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="My Books"
            value={myBooks?.length}
            change=""
            icon={Book}
            color="bg-[#1b8bcb]"
          />
          <StatsCard
            title="Active Requests"
            value={incomingRequests?.length}
            change=""
            icon={Clock}
            color="bg-emerald-500"
          />
          <StatsCard
            title="Total Earnings"
            value={`৳${(payments?.reduce((acc, p) => p.type !== 'Wallet Top-up' ? acc + p.amount : acc, 0).toFixed(2))}`}
            change=""
            icon={DollarSign}
            color="bg-purple-500"
          />
          <StatsCard
            title="Pickup Points"
            value={pickupPoints?.length}
            change=""
            icon={MapPin}
            color="bg-orange-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Books */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">My Books</h2>
                <Link to={'/dashboard/mybooks'}><button className="text-[#1b8bcb] text-sm font-medium hover:underline">
                  View All
                </button></Link>
              </div>
              {myBooks?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myBooks?.slice(0,4).map(book => (
                    <BookCard key={book?._id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Book className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">No books found</p>
                  <p className="text-sm">You haven’t added any book yet</p>
                </div>
              )}
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link to={'/dashboard/myrequest'}><button className="text-[#1b8bcb] text-sm font-medium hover:underline">
                  View All
                </button></Link>
              </div>
              {incomingRequests?.length > 0 || myRequests?.length > 0 ? (
                <div className="space-y-4">
                  {incomingRequests?.map(request => (
                    <RequestCard key={request?._id} request={request} type="incoming" />
                  ))}
                  {myRequests.slice(0, 1).map(request => (
                    <RequestCard key={request?.id} request={request} type="outgoing" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">No requests found</p>
                  <p className="text-sm">You haven’t received or sent any book request yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Stats */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Books Lent</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Books Borrowed</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-emerald-600">98%</span>
                </div>
              </div>
            </div> */}

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
              {payments?.length > 0 ? (
                <div className="space-y-3">
                  {payments?.slice(0, 3).map(payment => (
                    <PaymentItem key={payment?._id} payment={payment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">No payments yet</p>
                  <p className="text-sm">You haven’t made or received any payment</p>
                </div>
              )}
            </div>

            {/* Pickup Points */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Pickup Points</h3>
              {pickupPoints?.length > 0 ? (
                <div className="space-y-3">
                  {pickupPoints?.map(point => (
                    <div key={point?._id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <MapPin className="w-4 h-4 text-[#1b8bcb]" />
                      <div>
                        <div className="font-medium text-sm">{point?.Name}</div>
                        <div className="text-xs text-gray-500">{point?.Address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">No pickup points</p>
                  <p className="text-sm">You haven’t added any pickup point yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Shared Components
const StatsCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{change}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const BookCard = ({ book }) => (
  <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex space-x-3">
      <img
        src={book?.ImageUrl}
        alt={book?.Title}
        className="w-16 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">{book?.Title}</h3>
        <p className="text-xs text-gray-600 mb-2">{book?.Author}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#1b8bcb]">৳{book?.Price}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 `}>
            {book?.Availability}
          </span>
        </div>
        {book?.rating > 0 && (
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{book?.rating}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const RequestCard = ({ request, type }) => (
  <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-3">
      <img
        src={request?.book?.ImageUrl}
        alt={request?.book?.Title}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 text-sm">{request?.book?.Title}</h4>
          <StatusBadge status={request?.status} />
        </div>
        <p className="text-xs text-gray-600 mb-1">
          {type === 'incoming' ? `From: ${request.requester.Name}` : `To: ${request?.book?.BookOwner?.Name}`}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>${request.bookPrice}</span>
          {request.returnDate && (
            <span>Due: {new Date(request.returnDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'Accepted':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const PaymentItem = ({ payment }) => (
  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
        <DollarSign className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">
          {payment.type || 'Payment'}
        </div>
        <div className="text-xs text-gray-500">{payment.transactionId}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-bold text-emerald-600">+${payment.amount}</div>
      <div className="text-xs text-gray-500">{payment.status}</div>
    </div>
  </div>
);

export default UserDashboard;
