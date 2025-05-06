import React, { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';
import { useGetBookQuery } from '../redux/features/books/bookApi';
import BookCard from '../components/BookCard';

const categories = ['Fiction', 'Fantasy', 'Horror', 'Mystery', 'Biography', 'Technology'];
const sortOptions = [
  { label: 'Default', value: '' },
  { label: 'Price: Low to High', value: 'priceLowHigh' },
  { label: 'Price: High to Low', value: 'priceHighLow' },
  { label: 'Latest', value: 'latest' },
  { label: 'Top Rated', value: 'rating' },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const params = [];
  if (searchTerm) params.push({ name: 'searchTerm', value: searchTerm });
  if (selectedCategory) params.push({ name: 'category', value: selectedCategory });
  if (sortBy) params.push({ name: 'sort', value: sortBy });

  const { isLoading, currentData } = useGetBookQuery(params);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim();
    setSearchTerm(input);
  };

  useEffect(() => {
    setSearchTerm('');
  }, [selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-6 py-10  min-h-screen  bg-gradient-to-b from-primary-100 to-gray-50">
      {/* Sidebar */}
      <aside className="lg:w-1/5 w-full bg-white/80 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">🔍 Filters</h2>

        {/* Search */}
        <form onSubmit={handleSearch} className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Search Books</label>
          <div className="flex rounded-lg overflow-hidden shadow-sm">
            <input
              name="search"
              type="text"
              placeholder="Type title or author..."
              className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
            >
              Go
            </button>
          </div>
        </form>

        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium text-gray-600">Categories</label>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-left px-3 py-2 rounded-lg transition ${
                  selectedCategory === cat
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory('')}
              className="text-xs mt-2 text-blue-500 hover:underline"
            >
              Clear Category
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-600">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full mt-2 px-3 py-2 border rounded-lg focus:outline-none bg-white"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Book Display */}
      <main className="lg:w-4/5 w-full">
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData?.data?.length ? (
              currentData.data.map((book) => (
                <div
                  key={book._id}
                  className="  transition transform hover:-translate-y-1 duration-200"
                >
                  <BookCard book={book} types="topRated" />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">No books found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Books;
