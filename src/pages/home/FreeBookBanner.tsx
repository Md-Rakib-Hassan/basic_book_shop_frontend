import React from "react";
import { BookOpen, Star, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const formatTitle = (t = "", limit = 36) => (t.length > limit ? t.slice(0, limit) + "…" : t);
const formatAuthor = (a = "") => (a?.length ? a : "Unknown Author");

const RatingStars = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            size={14}
            className={`shrink-0 ${filled ? "fill-white text-white" : isHalf ? "text-white" : "text-white/50"}`}
          />
        );
      })}
    </div>
  );
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/25 shadow-sm">
    <Sparkles size={14} />
    {children}
  </span>
);

const CoverCard = ({ book, index, onClick }) => {
  const rotate = index * 2;
  const shiftX = index * -12;
  const availability = (book?.Availability || "").toLowerCase();
  const badgeText = availability === "lend" ? "Free to Lend" : availability === "sell" ? "Free Deal" : "Featured";

  return (
    <Link to={`/books/${book?._id}`}>
      <div
      
      className="relative w-24 sm:w-28 h-36 sm:h-40 rounded-xl shadow-xl border border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/5 backdrop-blur-md overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      style={{ transform: `translateX(${shiftX}px) rotate(${rotate}deg)`, zIndex: 10 - index }}
      aria-label={`${book?.Title || "Book"} by ${book?.Author || "Unknown"}`}
    >
      <img src={book?.ImageUrl} alt={book?.Title} className="w-full h-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 p-1 sm:p-2 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
        <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight">
          {formatTitle(book?.Title, 26)}
        </p>
        <p className="text-[9px] sm:text-[10px] text-white/80">{formatAuthor(book?.Author)}</p>
      </div>
      <span className="absolute top-1 left-1 text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white border border-white/20">
        {badgeText}
      </span>
    </div>
  </Link>
  );
};

const FreeBookBanner = ({ books = [] }) => {
  const primary = books?.[0];
  const showcase = books?.slice(1, 4);

  return (
    <div className="relative overflow-hidden shadow-2xl group w-full" style={{ minHeight: 500 }}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 0% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 60%, transparent 100%), linear-gradient(90deg, #6366f1, #60a5fa, #22d3ee)",
          backgroundSize: "200% 200%",
          animation: "bn-gradient 18s ease-in-out infinite",
        }}
      />

      {/* Patterns + vignette */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.08)_75%)] bg-[length:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>

      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 gap-6 sm:gap-8 py-8">
        {/* Left content */}
        <div className="text-white space-y-4 sm:space-y-6 max-w-2xl w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge>Free Collection</Badge>
            <Badge>Zero Cost</Badge>
            <Badge>High Rated</Badge>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 drop-shadow-lg">
              Enjoy Reading Without Paying
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-medium text-indigo-100 leading-relaxed">
            Free access to world literature and community favorites.
          </p>

          {/* Primary book card */}
          {primary && (
            <Link to={`/books/${primary?._id}`}><div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 shadow-xl">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                <img
                  src={primary.ImageUrl}
                  alt={primary.Title}
                  className="w-14 h-18 sm:w-16 sm:h-20 md:w-20 md:h-28 object-cover rounded-lg shadow-lg ring-1 ring-white/30"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <RatingStars value={Number(primary.Rating) || 0} />
                    <span className="text-xs text-white/80">{Number(primary.Rating) || 0}</span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white truncate" title={primary.Title}>
                    {primary.Title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-indigo-100">
                    by {formatAuthor(primary.Author)} · {primary.PublishedYear}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-2">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/25">
                      {primary.Category || "General"}
                    </span>
                    {primary.ISBN && (
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-white/10 text-white/90 border border-white/20">
                        ISBN {primary.ISBN}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div></Link>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2">
            <Link to={'/freebook'}>
            <button
              
              className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-bold text-base md:text-lg bg-white text-gray-900 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Read Now
              <ArrowRight size={18} />
            </button>
            </Link>
            <div className="text-white/80 text-sm sm:text-base mt-1 sm:mt-0">
              <span className="font-semibold">BookNest</span> • Free Forever
            </div>
          </div>

          {/* Mobile/Tablet: horizontal strip of covers */}
          {/* {books?.length > 1 && (
            <div className="lg:hidden mt-4 -mb-2 overflow-x-auto no-scrollbar">
              <div className="flex gap-3 pr-2">
                {books.slice(0, 10).map((b) => (
                  <button
                    key={b._id}
                    onClick={() => onBookClick?.(b)}
                    className="relative shrink-0 w-24 sm:w-28 h-36 sm:h-40 rounded-xl overflow-hidden bg-white/5 border border-white/20 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    aria-label={`${b.Title} by ${b.Author}`}
                  >
                    <img src={b.ImageUrl} alt={b.Title} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-1 sm:p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight">{formatTitle(b.Title, 24)}</p>
                      <p className="text-[9px] sm:text-[10px] text-white/80">{formatAuthor(b.Author)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          
        </div>

  <div className="hidden lg:block  relative group w-64 h-64">
  <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all duration-500" />
  
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover:border-white/50 transition-all duration-300">
    <span className="flex items-center justify-center text-5xl font-bold text-white">Free</span>
    <span className="flex items-center justify-center text-5xl font-bold text-white">Books</span>
  </div>
</div>


        {/* Right: stacked covers for desktop */}
        <div className="hidden lg:flex flex-col items-end gap-6 pb-8 ml-8">
          {showcase.map((b, i) => (
            <CoverCard key={b._id} book={b} index={i}  />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <style>{`
        @keyframes bn-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FreeBookBanner;
