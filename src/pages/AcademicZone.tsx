import "../pages/home/css/hideScroll.css";
import React, { useRef, useState, useEffect } from "react";
import {
  Search,
  Filter,
  BookOpen,
  GraduationCap,
  PenTool,
  Layers,
} from "lucide-react";
import { useGetAcademicBooksQuery, useGetAcademicFiltersQuery } from "../redux/features/books/bookApi";
import LoadingPage from "./LoadingPage";
import BookCard from "../components/BookCard";

export default function AcademicZone() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    condition: "",
    availability: "",
    sort: "latest",
    distance: 30,
  });

  const { currentData: insub } = useGetAcademicFiltersQuery(null);

 

  // Fetch books with filters
  const { data: books, isLoading } = useGetAcademicBooksQuery([
    { name: "searchTerm", value: searchQuery },
    { name: "condition", value: filters.condition },
    { name: "availability", value: filters.availability },
    { name: "sort", value: filters.sort },
  ]);



  if (isLoading) return <LoadingPage />;
   const subjects = insub?.data?.subjects;

  return (
    <>
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
    <div className="text-center">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
        <GraduationCap className="w-4 h-4" />
        <span>Learn • Borrow • Grow</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Empower Your Learning with
        <span className="block gradient-text">Academic Books</span>
      </h1>

      {/* Tagline */}
      <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
        Access textbooks, research materials, and study guides that help you excel 
        in academics. Borrow, buy, or sell study resources — all in one place.
      </p>

      {/* Stats */}
      <div className="flex justify-center items-center space-x-10 mb-16">
        <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{ books?.data?.length||0}+</div>
          <div className="text-sm text-gray-500">Academic Books</div>
        </div>
        <div className="w-px h-14 bg-gray-200"></div>
        <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">{ subjects?.length||0}+</div>
          <div className="text-sm text-gray-500">Subjects Covered</div>
        </div>
        <div className="w-px h-14 bg-gray-200"></div>
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-500">Top Rated</div>
          <div className="text-sm text-gray-500">Trusted by Students</div>
        </div>
      </div>
    </div>
  </div>

  {/* Floating Decorative Elements */}
  <div className="absolute inset-0">
    <div className="absolute top-10 left-1/4 transform -translate-x-1/2 opacity-20">
      <Layers className="w-16 h-16 text-blue-400 animate-bounce" style={{ animationDelay: "0s" }} />
    </div>
    <div className="absolute top-20 right-1/4 transform translate-x-1/2 opacity-20">
      <BookOpen className="w-14 h-14 text-indigo-400 animate-bounce" style={{ animationDelay: "1s" }} />
    </div>
    <div className="absolute bottom-12 left-1/3 transform -translate-x-1/2 opacity-20">
      <PenTool className="w-12 h-12 text-emerald-400 animate-bounce" style={{ animationDelay: "2s" }} />
    </div>
  </div>
</section>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Section Header (after hero) */}
<div className="mb-8">
  <div className="flex items-center space-x-2 mb-2">
    <GraduationCap className="w-6 h-6 text-blue-600" />
    <h2 className="text-2xl font-semibold text-gray-900">Available Academic Books</h2>
  </div>
  <p className="text-gray-600 text-base">
    Browse and borrow textbooks, research papers, and study materials from fellow students.
  </p>
</div>


      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search academic books by title, isbn, authors, subjects or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

    

      {/* Advanced Filters */}
      <div className="mb-6 ">
        <div className="flex flex-row-reverse">
          <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors "
        >
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
        </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={filters.condition}
                  onChange={(e) =>
                    setFilters({ ...filters, condition: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters({ ...filters, availability: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All</option>
                <option value="Sell">Buy</option>
                <option value="Lend">Borrow</option>
                </select>
              </div>

              {/* Sort */}
            <div>
              <label className="text-sm font-medium text-gray-700">Sort By</label>
              <select
                value={filters.sort}
                  onChange={(e) =>
                    setFilters({ ...filters, sort: e.target.value })
                  }
                className="w-full px-3 py-2 border rounded-lg"
              >
                
                <option value="latest">Latest</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Distance slider */}
            {/* <div>
              <label className="text-sm font-medium text-gray-700">Distance (km) - <span className="text-sm text-gray-500">{filters.distance} km</span></label>
              <input
                type="range"
                min={1}
                max={50}
                value={filters.distance}
                  onChange={(e) =>
                    setFilters({ ...filters, distance: parseFloat(e.target.value) })
                  }
                className="w-full"
              />
              
            </div> */}

              <div className="flex items-end">
                <button
                  onClick={() =>
                    setFilters({ condition: "", availability: "", sort: "nearest", distance: 30 })
                  }
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {activeSubject === "all"
            ? "All Academic Books"
            : `${activeSubject} Books`}
        </h2>
        <p className="text-gray-600">{books?.data?.length || 0} books found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books?.data.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {books?.data?.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No books found
          </h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
    </>
  );
}
