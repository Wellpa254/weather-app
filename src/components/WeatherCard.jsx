import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, wind, weather: weatherDetails } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h2 className="text-2xl font-bold">{name}</h2>
      <img src={iconUrl} alt={weatherDetails[0].description} className="mx-auto" />
      <p className="text-lg">{weatherDetails[0].main}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;
