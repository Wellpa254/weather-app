// src/services/newsService.js
const API_KEY = "pub_74b5e4fdb3d54f5aae7f27dc03add80a"; 

export async function fetchNews(countryCode) {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${countryCode}&language=en`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export function analyzeNews(news) {
  const redKeywords = ["violence", "attack", "protest", "war", "unrest", "riot"];
  const yellowKeywords = ["tension", "warning", "alert", "politics", "strike"];

  let score = 0;

  news.forEach((item) => {
    const text = `${item.title} ${item.description}`.toLowerCase();

    if (redKeywords.some((word) => text.includes(word))) score += 2;
    else if (yellowKeywords.some((word) => text.includes(word))) score += 1;
  });

  if (score >= 4) return { status: "Terrible Day", color: "red" };
  if (score >= 2) return { status: "Moderate Day", color: "yellow" };
  return { status: "Good Day", color: "green" };
}
