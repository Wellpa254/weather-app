import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = "483f3a89fa19beb569cd11588b82d7d3";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    if (!city || city.trim() === "") {
      setError("Please  try searching that city in the ant kingdom!!");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found. Try another one!");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Format date function
  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB", {
      weekday: "long",  // Monday, Tuesday...
      day: "numeric",   // 26
      month: "long",    // August
      year: "numeric",  // 2025
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-black to-red-600 transition-colors duration-700">
      <div className="rounded-xl p-6 bg-white/80 shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Weather Today 
        </h1>
        <p className="text-center text-gray-600 mb-6">{getFormattedDate()}</p>

        <SearchBar onSearch={fetchWeather} />
        <ErrorMessage message={error} />
        <WeatherCard weather={weather} />

        {!weather && !error && (
          <p className="text-center text-gray-500 mt-4">
            Enter a city to see the weather and activity suggestions.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
