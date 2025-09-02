import React, { useEffect, useState } from "react";
import destinations from "../data/destinations";

// Import images from assets
import sunnyImg from "../assets/sunny.jpg.jpg";
import nightImg from "../assets/night.jpg.jpg";
import rainyImg from "../assets/rainy.jpg.jpg";
import cloudyImg from "../assets/cloudy.jpg.jpg";
import snowyImg from "../assets/snowy.jpg.jpg";

const WeatherCard = ({ weather }) => {
  const [localTime, setLocalTime] = useState(null);
  const timezoneOffset = weather?.timezone || 0;

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

  if (!weather || !localTime)
    return <p className="text-center mt-4">Enter a city to see the weather...</p>;

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
  } else if (weather.weather[0].main === "Snow") {
    suggestion = "Time for building a snowman ⛄";
    category = "photography";
  }

  const city = weather.name;
  const cityDestinations =
    destinations[city]?.[category] ?? [
      { name: "Explore local attractions nearby", link: "#" },
      { name: "Ask locals for hidden gems", link: "#" },
    ];

  const makeMapsLink = (place) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.name || place + " " + city
    )}`;

  // Outfit suggestion logic
  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].description.toLowerCase();
  let outfit = "Dress comfortably!";

  if (temp >= 28) {
    outfit = "👕 T-shirt, 🩳 shorts, 🕶️ sunglasses";
  } else if (temp >= 20 && temp < 28) {
    outfit = "👔 Light shirt, 👖 jeans, 🧢 cap";
  } else if (temp >= 10 && temp < 20) {
    outfit = "🧥 Jacket, 👕 layered clothing, 👟 sneakers";
  } else if (temp < 10) {
    outfit = "🧣 Warm coat, 🧤 gloves, 🥾 boots";
  }

  if (condition.includes("rain")) {
    outfit += " + ☔ Umbrella recommended!";
  } else if (condition.includes("snow")) {
    outfit = "🧥 Heavy coat, 🧤 gloves, 🧣 scarf, ❄️ snow boots";
  }

  // Choose background image
  let bgImage = sunnyImg; // default
  if (weather.weather[0].main === "Clear" && !isDay) bgImage = nightImg;
  else if (weather.weather[0].main === "Rain") bgImage = rainyImg;
  else if (weather.weather[0].main === "Clouds") bgImage = cloudyImg;
  else if (weather.weather[0].main === "Snow") bgImage = snowyImg;

  return (
    <div
      className="mt-6 p-4 rounded-xl shadow-md text-center text-white bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "500px",
      }}
    >
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold drop-shadow-lg">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="drop-shadow">{formattedDate}</p>
        <p className="mb-2 drop-shadow">
          Local Time: <span className="font-semibold">{formattedTime}</span>
        </p>
        <p className="mb-4 font-semibold drop-shadow">
          {isDay ? "☀️ Daytime" : "🌙 Nighttime"}
        </p>
        <p className="text-4xl font-bold drop-shadow-lg">
          {temp}°C
        </p>
        <p className="capitalize drop-shadow">{weather.weather[0].description}</p>

        {/* Suggested Activity */}
        <div className="mt-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold">Suggested Activity:</h3>
          <p>{suggestion}</p>

          <ul className="mt-2 list-disc list-inside text-sm">
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

        {/* Outfit Suggestion */}
        <div className="mt-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold">👗 Outfit Suggestion</h3>
          <p>{outfit}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
