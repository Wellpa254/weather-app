import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = "483f3a89fa19beb569cd11588b82d7d3";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-tribal tracking-wide">
        Weather Dashboard
      </h1>

      {/* Search input */}
      <SearchBar onSearch={fetchWeather} />

      {/* Error message */}
      <ErrorMessage message={error} />

      {/* Weather info */}
      <div className="mt-6 w-full max-w-md">
        <WeatherCard weather={weather} />
      </div>

      {/* Showcase African theme colors */}
      <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-lg">
        <div className="bg-sand text-tribal p-4 rounded-lg shadow">
          African Sand
        </div>
        <div className="bg-forest text-ivory p-4 rounded-lg shadow">
          Deep Forest
        </div>
        <div className="bg-sky text-tribal p-4 rounded-lg shadow">
          African Sky
        </div>
        <div className="bg-terracotta text-ivory p-4 rounded-lg shadow">
          Terracotta
        </div>
      </div>
    </div>
  );
}

export default App;
