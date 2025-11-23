import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { useGetBookQuery } from "../redux/features/books/bookApi";
import BookCard from "../components/BookCard";
import { distanceKm } from "../utils/DistanceKm";
import { useUserLocation } from "../context/UserLocationContext";
import LoadingPage from "./LoadingPage";

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [availability, setAvailability] = useState("");
  const [distance, setDistance] = useState(30);
  const [sortBy, setSortBy] = useState("nearest");
  const { lat, lng } = useUserLocation();

  const { isLoading, currentData } = useGetBookQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "category", value: category },
    { name: "sort", value: sortBy },
  ]);

  

  

  const booksWithDistance = useMemo(() => {
    const list = currentData?.data || [];
    return list.map((b) => ({
      ...b,
      _distanceKm:
        lat != null && lng != null
          ? distanceKm(
              lat,
              lng,
              b.PickupPoint?.Latitude,
              b.PickupPoint?.Longitude
            )
          : null,
    }));
  }, [currentData, lat,lng]);

  const filteredBooks = useMemo(() => {
    let list = booksWithDistance;
    if (category) list = list.filter((b) => b.Category === category);
    if (condition) list = list.filter((b) => b.Condition === condition);
    if (availability) list = list.filter((b) => b.Availability === availability);
    if (distance)
      list = list.filter((b) => b._distanceKm != null && b._distanceKm <= distance);

    list = [...list].sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.Price - b.Price;
      if (sortBy === "priceHighLow") return b.Price - a.Price;
      if (sortBy === "rating") return (b.Rating || 0) - (a.Rating || 0);
      if (sortBy === "nearest") return (a._distanceKm || Infinity) - (b._distanceKm || Infinity);
      return 0;
    });

    return list;
  }, [booksWithDistance, category, condition, availability, distance, sortBy]);

  if (isLoading) return <LoadingPage></LoadingPage>;

  const categories = Array.from(
    new Set(currentData?.data?.map((b) => b.Category).filter(Boolean))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header & Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discover Books Near You</h1>
          <p className="text-gray-600">Find books to borrow or buy from your local community</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* Condition */}
            <div>
              <label className="text-sm font-medium text-gray-700">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            {/* Availability */}
            <div>
              <label className="text-sm font-medium text-gray-700">Availability For</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="nearest">Nearest</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="latest">Latest</option>
              </select>
            </div>

            {/* Distance slider */}
            <div>
              <label className="text-sm font-medium text-gray-700">Distance (km)</label>
              <input
                type="range"
                min={1}
                max={50}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{distance} km</span>
            </div>
            
          </div>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <BookCard book={book} types="topRated" />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
}
