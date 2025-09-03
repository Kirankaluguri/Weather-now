import { useState } from "react";

// Weather code to emoji mapping based on Open-Meteo docs
const weatherIcons = {
  0: "☀️ Clear sky",
  1: "🌤️ Mainly clear",
  2: "⛅ Partly cloudy",
  3: "☁️ Overcast",
  45: "🌫️ Fog",
  48: "🌫️ Fog with rime",
  51: "🌦️ Light drizzle",
  53: "🌦️ Moderate drizzle",
  55: "🌧️ Dense drizzle",
  61: "🌦️ Slight rain",
  63: "🌧️ Moderate rain",
  65: "🌧️ Heavy rain",
  71: "🌨️ Slight snow fall",
  73: "🌨️ Moderate snow fall",
  75: "❄️ Heavy snow fall",
  77: "🌨️ Snow grains",
  80: "🌦️ Light showers",
  81: "🌧️ Showers",
  82: "⛈️ Heavy showers",
  95: "⛈️ Thunderstorm",
  96: "⛈️ Thunderstorm with hail",
  99: "⛈️ Severe thunderstorm with hail",
};

// Weather code to background theme mapping
function getBackgroundClass(code) {
  if ([0, 1].includes(code)) return "bg-blue-200";
  if ([2, 3].includes(code)) return "bg-gray-300";
  if ([45, 48].includes(code)) return "bg-gray-200";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "bg-blue-400";
  if ([71, 73, 75, 77].includes(code)) return "bg-white";
  if ([95, 96, 99].includes(code)) return "bg-purple-400";
  return "bg-blue-100";
}

export default function WeatherNow() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found");
        setLoading(false);
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        country,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError("Failed to fetch weather");
    }
    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${weather ? getBackgroundClass(weather.weathercode) : "bg-blue-100"}`}
    >
      <h1 className="text-3xl font-bold mb-4">Weather Now</h1>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Check Weather"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 p-4 bg-white rounded shadow text-center">
          <h2 className="text-xl font-semibold">
            {weather.city}, {weather.country}
          </h2>
          <p>🌡️ {weather.temperature}°C</p>
          <p>💨 {weather.windspeed} km/h</p>
          <p>{weatherIcons[weather.weathercode] || "🌍 Unknown"}</p>
        </div>
      )}
    </div>
  );
}
