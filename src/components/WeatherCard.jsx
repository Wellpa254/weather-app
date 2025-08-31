import React, { useEffect, useState } from "react";
import destinations from "../data/destinations";

const WeatherCard = ({ weather }) => {
  // Hooks always at top
  const [localTime, setLocalTime] = useState(null);

  const timezoneOffset = weather?.timezone || 0; // use 0 if weather is undefined

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + timezoneOffset * 1000);
      setLocalTime(local);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset]);

  // If weather is not loaded yet, show nothing or a placeholder
  if (!weather || !localTime) return <p className="text-center mt-4">Enter a city to see the weather...</p>;

  // Format date/time
  const formattedDate = localTime.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  const isDay = localTime >= sunrise && localTime < sunset;

  let suggestion = "Reading indoors 📖";
  let category = "photography";

  if (weather.weather[0].main === "Clear" && isDay) {
    suggestion = "Perfect for hiking ⛰️";
    category = "hiking";
  } else if (weather.weather[0].main === "Clear" && !isDay) {
    suggestion = "Great time for stargazing ✨";
    category = "photography";
  } else if (weather.weather[0].main === "Rain") {
    suggestion = "Nice time for indoor reading ☕";
    category = "photography";
  } else if (weather.weather[0].main === "Clouds") {
    suggestion = "Good for outdoor photography 📸";
    category = "photography";
  } else if (weather.weather[0].main === "Hot") {
    suggestion = "Great for swimming 🏊 or beach visit 🌊";
    category = "swimming";
  }

  const city = weather.name;
  const cityDestinations =
    destinations[city]?.[category] ?? [
      { name: "Explore local attractions nearby", link: "#" },
      { name: "Ask locals for hidden gems", link: "#" },
    ];

  const makeMapsLink = (place) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name || place + " " + city)}`;

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        {weather.name}, {weather.sys.country}
      </h2>
      <p className="text-gray-600">{formattedDate}</p>
      <p className="text-gray-600 mb-2">
        Local Time: <span className="font-semibold">{formattedTime}</span>
      </p>
      <p className={`mb-4 font-semibold ${isDay ? "text-yellow-600" : "text-blue-800"}`}>
        {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
      </p>
      <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">Suggested Activity:</h3>
        <p className="text-gray-700">{suggestion}</p>

        <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
          {cityDestinations.map((place, index) => (
            <li key={index}>
              <a
                href={place.link || makeMapsLink(place)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {place.name || place}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;
