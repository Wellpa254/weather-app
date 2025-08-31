import React, { useEffect, useState } from "react";
import DestinationCard from "./DestinationCard";
import destinationsData from "../data/destinations";
import { fetchNews, analyzeNews } from "../services/newsService";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const [cityDate, setCityDate] = useState(null);
  const [activity, setActivity] = useState("");
  const [travelRating, setTravelRating] = useState(null);

  const tzShiftSec = weather.timezone;

  // Update city local time
  useEffect(() => {
    const updateTime = () => {
      const utcNowMs = Date.now();
      const cityNowMs = utcNowMs + tzShiftSec * 1000;
      setCityDate(new Date(cityNowMs));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [tzShiftSec]);

  if (!cityDate) return null;

  const formattedTime = cityDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });

  const formattedDate = cityDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const { sunrise, sunset } = weather.sys;
  const nowUtcSec = Math.floor(Date.now() / 1000);
  const isDay = nowUtcSec >= sunrise && nowUtcSec < sunset;

  // Activity suggestion based on weather
  const getActivitySuggestion = () => {
    const condition = weather.weather[0].main.toLowerCase();
    const temp = Math.round(weather.main.temp);

    if (!isDay) {
      setActivity(""); // No outdoor activity at night
      return "Relax at home or watch a movie 🎬";
    }

    if (condition.includes("clear")) {
      if (temp > 28) {
        setActivity("swimming");
        return "Perfect day for a swim 🏖️";
      }
      if (temp >= 18) {
        setActivity("hiking");
        return "Great day for hiking or a city walk 🥾";
      }
      setActivity("photography");
      return "Nice day for outdoor photography 📸";
    }

    if (condition.includes("cloud")) {
      setActivity("photography");
      return "Light clouds make it great for photography 📸";
    }

    if (condition.includes("rain")) {
      setActivity("");
      return "Best to stay indoors with a hot drink ☕";
    }

    setActivity("photography");
    return "Enjoy your day with some outdoor photography 🌟";
  };

  const suggestionText = getActivitySuggestion();

  // Fetch travel safety news
  useEffect(() => {
    async function getNews() {
      try {
        const news = await fetchNews(weather.name);
        const analysis = analyzeNews(news);
        setTravelRating(analysis);
      } catch (err) {
        console.error("Error fetching news:", err);
        setTravelRating({ status: "Unavailable", color: "gray" });
      }
    }
    getNews();
  }, [weather.name]);

  // Get destination data for city
  const cityDestinations = destinationsData[weather.name] || destinationsData[weather.sys.country];

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="text-gray-600">{formattedDate}</p>
      <p className="text-gray-700 mb-2">
        Local Time: <span className="font-semibold">{formattedTime}</span>
      </p>
      <p className={`mb-4 font-semibold ${isDay ? "text-yellow-600" : "text-blue-800"}`}>
        {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
      </p>

      <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-sm">
        <p className="font-medium text-green-700">
          Suggested Activity: {suggestionText}
        </p>
      </div>

      {travelRating && (
        <div className="mt-3 flex items-center justify-center">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              travelRating.color === "green"
                ? "bg-green-500"
                : travelRating.color === "yellow"
                ? "bg-yellow-500"
                : travelRating.color === "red"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          ></span>
          <span>{travelRating.status} day to visit</span>
        </div>
      )}

      {/* Render destinations if activity is suggested */}
      {activity && cityDestinations && cityDestinations[activity] && (
        <div className="mt-4">
          {cityDestinations[activity].map((dest, index) => (
            <a
              key={index}
              href={dest.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline mb-1"
            >
              {dest.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
