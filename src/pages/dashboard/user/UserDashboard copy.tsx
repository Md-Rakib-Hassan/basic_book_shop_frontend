import React, { useState } from 'react';
import { 
  Book, 
  Clock, 
  DollarSign, 
  MapPin, 
  User, 
  Bell, 
  Search,
  Menu,
  X,
  Star,
  ChevronRight,
  TrendingUp,
  Users,
  BookOpen,
  CreditCard,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

// Mock data based on user's actual data
const userData = {
  name: "Md. Rakib Hassan",
  email: "a@a.com",
  balance: 1614.97,
  profileImage: "https://res.cloudinary.com/dw74s1u8t/image/upload/v1744371573/hbheayyftzwxj17uo6ot.jpg"
};

const myBooks = [
  {
    id: "68b3191c1bb665ddb0bd8621",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 45,
    category: "Academic",
    condition: "New",
    rating: 0,
    stockQuantity: 5,
    image: "https://m.media-amazon.com/images/I/91Tm1zvLU2L._UF1000,1000_QL80_.jpg",
    status: "Available"
  },
  {
    id: "67c40230d93c2c47eb68c409",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    price: 22.99,
    category: "Fantasy",
    condition: "Used",
    rating: 5,
    stockQuantity: 63,
    image: "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg",
    status: "Available"
  }
];

const incomingRequests = [
  {
    id: "68bd0127bdaa031ab95e9430",
    book: {
      title: "Data Structures and Algorithms Made Easy in Java",
      author: "Narasimha Karumanchi",
      image: "https://res.cloudinary.com/dw74s1u8t/image/upload/v1756567836/raf11cglywqsdfkcvcyq.png"
    },
    requester: {
      name: "Mim",
      profileImage: "https://res.cloudinary.com/dw74s1u8t/image/upload/v1744281815/lszncmdfrt49ff7wlrdc.png"
    },
    status: "Accepted",
    bookPrice: 49,
    securityDeposit: 451,
    note: "i need this",
    isHandovered: true,
    returnDate: "2025-09-10"
  }
];

const myRequests = [
  {
    id: "68bc930572dbf98cbd0b4aa6",
    book: {
      title: "A Court of Thorns and Roses",
      author: "Sarah J. Maas",
      image: "https://res.cloudinary.com/dw74s1u8t/image/upload/v1756891436/aj1omdnihnxqns8d2ikn.jpg"
    },
    owner: {
      name: "Mim"
    },
    status: "Completed",
    bookPrice: 30,
    paymentStatus: "Deposit Refunded",
    isReturned: true,
    returnDate: "2025-09-10"
  }
];

const payments = [
  {
    id: "68bd0175bdaa031ab95e9484",
    amount: 49,
    status: "Completed",
    book: "Data Structures and Algorithms Made Easy in Java",
    from: "Mim",
    transactionId: "E488EABB",
    date: "2025-09-07"
  },
  {
    id: "68b8bfe25eacb68dc8273a47",
    amount: 2000,
    status: "Completed",
    transactionId: "99CB8DC0",
    date: "2025-09-03",
    type: "Wallet Top-up"
  }
];

const pickupPoints = [
  {
    id: "68a4a040c385a3ef4670e2a3",
    name: "Kalma",
    address: "V7CR+9GC, Bangladesh",
    latitude: 23.8707302,
    longitude: 90.2905779
  },
  {
    id: "68a4adc4c385a3ef4670e2e5",
    name: "Mirpur",
    address: "Baby Park, Avenue 2, ঢাকা, Bangladesh",
    latitude: 23.836543104176588,
    longitude: 90.3695011138916
  }
];

function UserDashboard() {
  const [activeDesign, setActiveDesign] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="My Books"
            value={myBooks.length}
            change="+2 this month"
            icon={Book}
            color="bg-[#1b8bcb]"
          />
          <StatsCard
            title="Active Requests"
            value={incomingRequests.length}
            change="1 pending"
            icon={Clock}
            color="bg-emerald-500"
          />
          <StatsCard
            title="Total Earnings"
            value={`$${payments.reduce((acc, p) => p.type !== 'Wallet Top-up' ? acc + p.amount : acc, 0)}`}
            change="+$49 today"
            icon={DollarSign}
            color="bg-purple-500"
          />
          <StatsCard
            title="Pickup Points"
            value={pickupPoints.length}
            change="All active"
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
                <button className="text-[#1b8bcb] text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-[#1b8bcb] text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {incomingRequests.map(request => (
                  <RequestCard key={request.id} request={request} type="incoming" />
                ))}
                {myRequests.slice(0, 1).map(request => (
                  <RequestCard key={request.id} request={request} type="outgoing" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
              <div className="space-y-3">
                {payments.slice(0, 3).map(payment => (
                  <PaymentItem key={payment.id} payment={payment} />
                ))}
              </div>
            </div>

            {/* Pickup Points */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Pickup Points</h3>
              <div className="space-y-3">
                {pickupPoints.map(point => (
                  <div key={point.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <MapPin className="w-4 h-4 text-[#1b8bcb]" />
                    <div>
                      <div className="font-medium text-sm">{point.name}</div>
                      <div className="text-xs text-gray-500">{point.address}</div>
                    </div>
                  </div>
                ))}
              </div>
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
        src={book.image}
        alt={book.title}
        className="w-16 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">{book.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#1b8bcb]">${book.price}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            book.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {book.status}
          </span>
        </div>
        {book.rating > 0 && (
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
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
        src={request.book.image || (type === 'incoming' ? request.book.image : request.book.image)}
        alt={request.book.title}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 text-sm">{request.book.title}</h4>
          <StatusBadge status={request.status} />
        </div>
        <p className="text-xs text-gray-600 mb-1">
          {type === 'incoming' ? `From: ${request.requester.name}` : `To: ${request.owner.name}`}
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
          {payment.book || payment.type || 'Payment'}
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