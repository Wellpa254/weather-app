// src/components/WeatherCard.jsx
import React from "react";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-sand text-tribal rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="text-lg italic">{weather.weather[0].description}</p>
      <p className="text-4xl font-extrabold text-forest">
        {Math.round(weather.main.temp)}°C
      </p>
      <div className="flex justify-between w-full mt-4 text-sm">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
