# 🌦️ WeatherNow App

A simple **React weather application** built for **Jamie (Outdoor Enthusiast persona)**.  
It fetches **current weather** and a **5-day forecast** for any city using the **Open-Meteo API** 🌍.  

---

## ✨ Features
- 🔎 Search weather by **city name**  
- 📍 Shows **current temperature, condition, wind speed**  
- 📅 **5-day forecast** (min/max temperatures + icons)  
- 🌡️ **Unit toggle (°C / °F)**  
- 🎨 **Dynamic backgrounds** (sun, clouds, rain, snow, storm, fog)  
- 🖼️ Clean, modern UI  

---

## 🛠️ Tech Stack
- **React 18** (Create React App)  
- **Open-Meteo API** (no API key needed)  
- **CSS3** for styling  

---

## 🚀 Getting Started

### 1. Clone the repo

git clone https://github.com/yourusername/weathernow.git
cd weathernow

### 2. Install dependencies

npm install

### 3. Run the app (development mode)

npm start

Open 👉 http://localhost:3000

### 4. Build for production

npm run build

### 📂 Project Structure
```
src/
 ├─ App.js              # Root wrapper
 ├─ App.css             # Global styles
 ├─ WeatherNow.js       # Main weather component
 ├─ WeatherNow.css      # Styles for WeatherNow
 ├─ index.js            # Entry point
 ├─ index.css           # Base styles
 ├─ reportWebVitals.js  # Performance logging
 └─ setupTests.js       # Test setup
```
### 🌍 API Reference
We use Open-Meteo endpoints:

# Geocoding API (city → coordinates)
```
https://geocoding-api.open-meteo.com/v1/search?name={city}
```
# Forecast API (current + daily forecast)
```
https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lon}
  &current_weather=true
  &daily=temperature_2m_max,temperature_2m_min,weathercode
  &timezone=auto
  &temperature_unit={celsius|fahrenheit}
```
### 📜 License

MIT License © 2025


---

✅ This README includes **everything in one place**:  
- Features  
- Setup instructions  
- Project structure  
- API reference  
- Code notes (explaining logic)  
- Persona  
- License  

