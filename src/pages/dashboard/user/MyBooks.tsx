import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import { useDeleteBookMutation, useGetMyBooksQuery } from "../../../redux/features/books/bookApi";
import { Link } from "react-router";
import { showConfirm } from "../../../components/ui/Confirm Modal/ConfirmDialog";
import { toast } from "sonner";



export default function MyBooks() {
  const { data: myBooks, isLoading, error } = useGetMyBooksQuery(null);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (bookId: string) => {
    showConfirm({
      title: 'Delete this item?',
      message: 'This action cannot be undone.',
      onConfirm: async() => {
        try {
          toast.loading('Deleting book...');
          await deleteBook(bookId).unwrap();
          toast.dismiss();
          toast.success('Book deleted successfully');
        } catch (error) {
          toast.dismiss();
          toast.error('Failed to delete book. Please try again.');
        }
      },
      onCancel: () => {
        toast.info('Book deletion cancelled');
      },
    });
   
  };

  const getStatus = (book: any) => {
    if (book.Availability.toLowerCase() === "lend") {
      return "available";
    }
    if (book.Availability.toLowerCase() === "sell") {
      return "available";
    }
    return "available"; // fallback
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "borrowed":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "borrowed":
        return "Currently Borrowed";
      case "sold":
        return "Sold";
      default:
        return status;
    }
  };

  if (isLoading)
    return <p className="text-center mt-6">Loading your books...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-600">Failed to load your books</p>
    );

  const books = myBooks?.data || [];

  const stats = {
    total: books.length,
    available: books.filter((b: any) => getStatus(b) === "available").length,
    borrowed: books.filter((b: any) => getStatus(b) === "borrowed").length,
    sold: books.filter((b: any) => getStatus(b) === "sold").length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Book Listings
        </h1>
        <p className="text-gray-600">
          Manage your shared books and track their status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Books</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          <p className="text-sm text-gray-600">Available</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.borrowed}</p>
          <p className="text-sm text-gray-600">Borrowed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">{stats.sold}</p>
          <p className="text-sm text-gray-600">Sold</p>
        </div>
      </div>

      {/* Books List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {books.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No books listed yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start sharing your books with the community
            </p>
            <Link to={'/dashboard/addbook'}>
            <button
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add Your First Book
            </button></Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book: any) => {
                  const status = getStatus(book);
                  return (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={book.ImageUrl}
                            alt={book.Title}
                            className="w-12 h-16 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <Link to={`/books/${book?._id}`}><div className="text-sm font-medium text-gray-900">
                              {book.Title}
                            </div></Link>
                            <div className="text-sm text-gray-500">
                              by {book.Author}
                            </div>
                            <div className="text-xs text-gray-400">
                              {book.Category} • {book.Condition}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center space-x-2">
                            {book.Availability.toLowerCase() === "lend" ? (
                              <BookOpen className="w-4 h-4 text-primary-500" />
                            ) : (
                              <ShoppingBag className="w-4 h-4 text-secondary-500" />
                            )}
                            <span className="flex flex-col">
                              <span className="text-sm text-gray-700 capitalize">
                                {book.Availability}
                              </span>
                              <span className="text-sm text-gray-700 capitalize">
                                ৳ {book.Price}
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${book?.AdminApproved==true?"bg-green-100 text-green-800":"bg-red-100 text-red-700"}`}
                        >
                          {book?.AdminApproved==true?"Published":"Not Published"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link to={`/books/${book._id}`}>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link to={"/dashboard/edit/" + book._id}>
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        </Link>
                        <Link to={"/dashboard/book/" + book._id}>
                          <button
                            //   onClick={() => onViewRequests(book._id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Requests"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                          onClick={() => handleDeleteBook(book._id)}

                          // TODO: hook up delete API
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
