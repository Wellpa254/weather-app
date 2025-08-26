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
      if (!response.ok) throw new Error("Try searching that city in the ant kingdom!!");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      {/* Pan-African triple ring via layered box-shadows (always visible) */}
      <div
        className="relative w-[min(92vw,700px)] rounded-3xl bg-ivory p-6 md:p-8"
        style={{
          boxShadow:
            "0 0 0 6px #dc2626, 0 0 0 12px #000000, 0 0 0 18px #16a34a, 0 16px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Thin “flag ribbons” top & bottom for extra flair */}
        <div className="pointer-events-none absolute left-6 right-6 -top-3 h-1.5 rounded-full bg-gradient-to-r from-red-600 via-black to-green-600 opacity-95" />
        <div className="pointer-events-none absolute left-6 right-6 -bottom-3 h-1.5 rounded-full bg-gradient-to-r from-green-600 via-black to-red-600 opacity-95" />

        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-tribal text-center tracking-wide">
          Weather Dashboard 🌍
        </h1>

        <SearchBar onSearch={fetchWeather} />
        <ErrorMessage message={error} />

        <div className="mt-6">
          <WeatherCard weather={weather} />
        </div>
      </div>
    </div>
  );
}

export default App;
