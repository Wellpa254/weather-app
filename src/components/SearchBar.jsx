import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-l"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
