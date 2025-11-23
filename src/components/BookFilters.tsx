interface BookFiltersProps {
  condition: string;
  setCondition: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
}

const BookFilters: React.FC<BookFiltersProps> = ({
  condition,
  setCondition,
  availability,
  setAvailability,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Condition Filter */}
      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="border px-4 py-2 rounded-xl focus:ring focus:ring-blue-200"
      >
        <option value="">All Conditions</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      {/* Availability Filter */}
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="border px-4 py-2 rounded-xl focus:ring focus:ring-blue-200"
      >
        <option value="">All Availability</option>
        <option value="Sell">For Sale</option>
        <option value="Lend">For Lending</option>
      </select>
    </div>
  );
};

export default BookFilters;
