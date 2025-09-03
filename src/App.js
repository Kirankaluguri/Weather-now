import React from "react";
import WeatherNow from "./WeatherNow";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <WeatherNow />
      </header>
    </div>
  );
}

export default App;
