import "../pages/home/css/hideScroll.css";
import React, { useState } from "react";
import {
  Search,
  Gift,
  BookOpen,
  ArrowRight,
  Heart,
  TrendingUp,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import LoadingPage from "./LoadingPage";
import BookCard from "../components/BookCard";
import { useGetFreeBooksQuery } from "../redux/features/books/bookApi";
import { Link } from "react-router";

export default function FreeBook() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch only free books (Price = 0)
  const { data: books, isLoading } = useGetFreeBooksQuery([
    { name: "searchTerm", value: searchQuery },
  ]);

  console.log(books);

  if (isLoading) return <LoadingPage />;

  const uniqueCategories = [...new Set(books?.data?.map(book => book.Category))];
  const avgRating = books?.data?.reduce((sum, book) => sum + (book.Rating || 0), 0)

  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              <span>100% Free • No Hidden Costs</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing
              <span className="gradient-text block">Free Books</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of free books from generous
              community members. Start your reading journey without spending a
              penny.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{books?.data?.length }+</div>
                <div className="text-sm text-gray-500">Free Books</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{uniqueCategories?.length}+</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">4.8★</div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 opacity-20">
                <BookOpen
                  className="w-16 h-16 text-blue-400 animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
              </div>
              <div className="absolute -top-8 right-1/4 transform translate-x-1/2 opacity-20">
                <Heart
                  className="w-12 h-12 text-emerald-400 animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className=" mx-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        {/* <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
          Free Book Zone
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          A handpicked collection of books available for free.  
          Enjoy reading and let it inspire you to explore our{" "}
          <span className="font-semibold text-blue-600">Academic</span>  
          and{" "}
          <span className="font-semibold text-indigo-600">General</span> sections.
        </p>
      </div> */}

        {/* Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search free books by title, isbn, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {books?.data?.length || 0} Free Books Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books?.data.map((book: any) => (
            <div className="hover:scale-[1.02] transition-transform">
              <BookCard key={book._id} book={book} />
            </div>
          ))}
        </div>

        {books?.data?.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No free books available
            </h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main CTA Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>More Ways to Read</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Beyond Free Books
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At BookNest, you can not only enjoy free books but also borrow,
                buy, or sell books in both academic and general categories.
                Discover your next read in the way that suits you best.
              </p>
            </div>

            {/* CTA Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Academic Zone */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Academic Zone
                    </h3>
                    <p className="text-blue-600 font-medium">
                      Textbooks & Study Materials
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Find and borrow textbooks, research resources, and academic
                  references. Whether free or for a small price, students and
                  researchers can easily get what they need for their studies.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Wide collection of textbooks</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Borrow or buy at affordable prices</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Sell your old study materials</span>
                  </div>
                </div>

                <Link to="/academic">
                  <button className="w-full bg-gradient-to-r from-primary-600 to-indigo-500 hover:from-primary-700 hover:to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 group transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                    <span>Explore Academic Zone</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* General Zone */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      General Zone
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      Fiction & Non-Fiction
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Browse novels, non-fiction works, and popular titles. Readers
                  can borrow, buy, or even sell their favorite books with ease —
                  making reading more accessible for everyone.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span>Bestsellers & trending books</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span>Borrow or purchase easily</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span>Option to sell your books locally</span>
                  </div>
                </div>

                <Link to="/books">
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 group transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                    <span>Explore General Zone</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>
                  Thousands of readers already exploring BookNest zones
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
