import React from 'react';
import { Link } from 'react-router';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import DataTable from '../../../components/dashboard/DataTable';
import { toast } from 'sonner';
import { useGetBookQuery } from '../../../redux/features/books/bookApi';
import LoadingPage from '../../LoadingPage';

const ManageBooks: React.FC = () => {
  const { data, isLoading } = useGetBookQuery('');
  if (isLoading) return <LoadingPage></LoadingPage>
  const books = data?.data || [];
  // console.log(books);
  const booksWithAuthors = books.map(book => {
    const author =  book.Author;
    return { ...book, authorName: author ? author.Name : 'Unknown' };
  });
  
  const handleDeleteBook = (bookId: string) => {
    console.log('Delete book:', bookId);
    toast.success('Book deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
          <p className="mt-1 text-sm text-gray-500">Add, edit, or remove books from your inventory</p>
        </div>
        <Link to="/dashboard/books/add">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            <PlusCircle size={18} />
            Add New Book
          </motion.button>
        </Link>
      </div>

      <DataTable
        columns={[
          {
            header: 'Book',
            accessor: (book) => (
              <div className="flex items-center">
                <img 
                  src={book.ImageUrl} 
                  alt={book.Title} 
                  className="h-12 w-10 object-cover rounded mr-3" 
                />
                <div>
                  <div className="font-medium text-gray-900">{book.Title}</div>
                  <div className="text-gray-500 text-sm">ISBN: {book.ISBN}</div>
                </div>
              </div>
            ),
          },
          { header: 'Author', accessor: 'authorName' },
          { 
            header: 'Category', 
            accessor: (book) => (
              <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-800">
                {book.Category}
              </span>
            )
          },
          { 
            header: 'Price', 
            accessor: (book) => `$${book.Price.toFixed(2)}` 
          },
          { 
            header: 'Stock', 
            accessor: (book) => (
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                book.StockQuantity > 50 
                  ? 'bg-green-100 text-green-800' 
                  : book.StockQuantity > 10
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {book.StockQuantity}
              </span>
            )
          },
          {
            header: 'Actions',
            accessor: (book) => (
              <div className="flex space-x-2">
                <Link to={`/dashboard/admin/books/edit/${book?._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 text-xs rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200"
                  >
                    <Edit size={16} />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteBook(book?._id as string)}
                  className="p-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash size={16} />
                </motion.button>
              </div>
            ),
          },
        ]}
        data={booksWithAuthors}
        searchable
        searchPlaceholder="Search books by title, author, or ISBN..."
      />
    </div>
  );
};

export default ManageBooks;