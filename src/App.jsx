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
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      <ErrorMessage message={error} />
      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;
