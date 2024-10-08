import React from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search cards..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>
  );
};

export default SearchBar;
