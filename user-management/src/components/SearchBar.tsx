import React from "react";
import { ThemeMode } from "../types";

interface SearchBarProps {
  onSearch: (term: string) => void;
  theme: ThemeMode;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, theme }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Search users..."
        className={`w-full md:w-64 px-4 py-2 border ${
          theme === "dark"
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900"
        } rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
