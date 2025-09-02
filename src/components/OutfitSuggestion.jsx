import React from "react";

const OutfitSuggestion = ({ weather, temp }) => {
  let suggestion = "Dress comfortably!";

  if (temp >= 28) {
    suggestion = "👕 T-shirt, 🩳 shorts, 🕶️ sunglasses";
  } else if (temp >= 20 && temp < 28) {
    suggestion = "👔 Light shirt, 👖 jeans, maybe a 🧢 cap";
  } else if (temp >= 10 && temp < 20) {
    suggestion = "🧥 Jacket, 👕 layered clothing, 👟 sneakers";
  } else if (temp < 10) {
    suggestion = "🧣 Warm coat, 🧤 gloves, 🥾 boots";
  }

  if (weather.includes("rain")) {
    suggestion += " + ☔ Don’t forget an umbrella!";
  } else if (weather.includes("snow")) {
    suggestion = "🧥 Heavy coat, 🧤 gloves, 🧣 scarf, ❄️ snow boots";
  }

  return (
    <div className="mt-4 p-3 bg-white/20 rounded-xl text-white text-center shadow-lg">
      <h3 className="text-lg font-semibold">👗 Outfit Suggestion</h3>
      <p className="mt-1">{suggestion}</p>
    </div>
  );
};

export default OutfitSuggestion;
