import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, XCircle, Trash } from 'lucide-react';
import { useGetBookQuery, useDeleteBookMutation, useUpdateBookApprovalMutation, useGetAllBookQuery } from '../../../redux/features/books/bookApi';
import LoadingPage from '../../LoadingPage';
import { toast } from 'sonner';
import {motion}from "framer-motion"
import { showConfirm } from '../../../components/ui/Confirm Modal/ConfirmDialog';
import { ApprovalToggle } from '../../../components/ui/ApprovalToggle';


export default function BookTableView() {
  const { data, isLoading } = useGetAllBookQuery([{ name: 'category', value:'sp'}]);
  const [deleteBook] = useDeleteBookMutation();
  const [updateApproval] = useUpdateBookApprovalMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());

  if (isLoading) return <LoadingPage />;

  const books = data?.data || [];

  // Search & filter logic
  const filteredBooks = books.filter((book: any) => {
    const matchesSearch =
      book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.Author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'approved' && book.AdminApproved) ||
      (filterStatus === 'pending' && !book.AdminApproved);
    return matchesSearch && matchesFilter;
  });

  const toggleApprove = () => {
    
  }

  const handleApproval = async (book) => {
    toast.loading("Publishing the book...")
    try {
      const res=await updateApproval({
        bookId: book._id,
        approved: !book.AdminApproved, // toggle state
      }).unwrap();
      toast.dismiss();
      if (res.success) {
        toast.success('Published the book successfully');
      }
      else {
        toast.error("Something went wrong!!!");
      }
    } catch (error) {
      console.error("Failed to update approval", error);
    }
  };

  // Delete handler
  const handleDeleteBook = async (bookId: string) => {
    showConfirm({
      title: 'Delete this book?',
      message: 'This action cannot be undone.',
      onConfirm: async () => {
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

 

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
  {/* Left side: Heading + subtitle */}
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
    <p className="mt-1 text-sm text-gray-500">View, publish, and manage book listings</p>
  </div>

  {/* Right side: Search & Filter */}
  <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
    {/* Search */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b8bcb] focus:border-transparent"
      />
    </div>

    {/* Filter */}
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as 'all' | 'approved' | 'pending')
        }
        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b8bcb] focus:border-transparent appearance-none bg-white"
      >
        <option value="all">All Books</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  </div>
</div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book: any) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-16 w-12 object-cover rounded" src={book.ImageUrl} alt={book.Title} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{book.Title}</div>
                        <div className="text-sm text-gray-500">{book.Author || 'Unknown'}</div>
                        <div className="text-xs text-gray-400">{book.PublishedYear}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs rounded-full bg-blue-100 text-blue-800">
                      {book.Category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm  text-primary">৳ {book.Price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{book.Condition}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-medium rounded-full ${
                        book.AdminApproved ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {book.AdminApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{book.BookOwner?.Name}</div>
                    <div className="text-xs text-gray-500">{book.BookOwner?.Email}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center space-x-2">

                      {/* Approval toggle */}
                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleApproval(book)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md ${
                                          book?.AdminApproved
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200':'bg-green-100 text-green-700 hover:bg-green-200'
                                            
                                        }`}
                                      >
                                        {book.AdminApproved ?  'Hide':'Publish'}
                                      </motion.button>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="p-1 text-red-600 hover:text-red-800 rounded"
                        title="Delete book"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
