import React, { useState } from "react";
import "./WeatherNow.css";

// Map weather codes to text + emoji
const weatherCodeMap = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Depositing rime fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Moderate drizzle", icon: "🌦️" },
  55: { text: "Dense drizzle", icon: "🌧️" },
  61: { text: "Slight rain", icon: "🌧️" },
  63: { text: "Moderate rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Slight snow fall", icon: "🌨️" },
  73: { text: "Moderate snow fall", icon: "❄️" },
  75: { text: "Heavy snow fall", icon: "❄️" },
  77: { text: "Snow grains", icon: "❄️" },
  80: { text: "Slight rain showers", icon: "🌦️" },
  81: { text: "Moderate rain showers", icon: "🌧️" },
  82: { text: "Violent rain showers", icon: "⛈️" },
  85: { text: "Slight snow showers", icon: "🌨️" },
  86: { text: "Heavy snow showers", icon: "❄️" },
  95: { text: "Thunderstorm", icon: "⛈️" },
  96: { text: "Thunderstorm with slight hail", icon: "🌩️" },
  99: { text: "Thunderstorm with heavy hail", icon: "🌩️" },
};

function WeatherNow() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Geocode city → lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country_code } = geoData.results[0];

      // 2. Fetch current weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      const w = weatherData.current_weather;

      setWeather({
        city: name,
        country: country_code,
        temperature: w.temperature,
        windspeed: w.windspeed,
        weathercode: w.weathercode,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Pick background class from weathercode
  const getBackgroundClass = (code) => {
    if (!code) return "default-bg";
    if ([0, 1].includes(code)) return "clear-bg";
    if ([2, 3].includes(code)) return "clouds-bg";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rain-bg";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow-bg";
    if ([95, 96, 99].includes(code)) return "storm-bg";
    if ([45, 48].includes(code)) return "fog-bg";
    return "default-bg";
  };

  return (
    <div className={`weather-page ${getBackgroundClass(weather?.weathercode)}`}>
      <h1 className="app-title">Weather App</h1>

      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </form>

      {loading && <p className="info">Loading weather...</p>}
      {error && <p className="error">Error: {error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p className="temp">{Math.round(weather.temperature)}°C</p>
          <p className="condition">
            {weatherCodeMap[weather.weathercode]?.icon || "❔"}{" "}
            {weatherCodeMap[weather.weathercode]?.text || "Unknown"}
          </p>
          <p>💨 {weather.windspeed} km/h Wind</p>
        </div>
      )}
    </div>
  );
}

export default WeatherNow;
