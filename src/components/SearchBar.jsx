import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-green-600 via-red-600 to-black 
        hover:scale-105 hover:shadow-lg transition-transform duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
