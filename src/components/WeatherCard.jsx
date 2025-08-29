import React, { useEffect, useState } from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const [localTime, setLocalTime] = useState(null);
  const timezoneOffset = weather.timezone; // in seconds

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const local = new Date(now.getTime() + timezoneOffset * 1000);
      setLocalTime(local);
    };

    updateTime(); // run immediately
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, [timezoneOffset]);

  if (!localTime) return null;

  // Format time nicely
  const formattedTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Determine if it's day or night based on API sunrise/sunset
  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  const isDay = localTime >= sunrise && localTime < sunset;

  // Suggest an activity based on weather + time
  const getActivitySuggestion = () => {
    const condition = weather.weather[0].main.toLowerCase();
    const temp = Math.round(weather.main.temp);

    if (!isDay) {
      if (condition.includes("rain") || condition.includes("snow")) {
        return "Perfect night to stay in and read a book 📚";
      }
      return "Great time to relax, maybe watch a movie 🎬";
    }

    if (condition.includes("clear")) {
      if (temp > 25) return "Great day for the beach 🏖️";
      if (temp > 15) return "Perfect for hiking or a walk 🚶‍♂️";
      return "A calm day for reading outside 📖";
    }

    if (condition.includes("cloud")) {
      return "Nice day for a walk or some outdoor photography 📸";
    }

    if (condition.includes("rain")) {
      return "Best to stay indoors and enjoy a hot drink ☕";
    }

    if (condition.includes("snow")) {
      return "Bundle up! Maybe build a snowman ⛄";
    }

    return "Enjoy your day in your own style 🌟";
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="text-gray-600 mb-2">
        Local Time: <span className="font-semibold">{formattedTime}</span>
      </p>
      <p
        className={`mb-4 font-semibold ${
          isDay ? "text-yellow-600" : "text-blue-800"
        }`}
      >
        {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
      </p>

      <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>

      {/* New Activity Suggestion Section */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-sm">
        <p className="font-medium text-green-700">
          Suggested Activity: {getActivitySuggestion()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
