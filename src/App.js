import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    setLoading(true);
    setError(false);

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=fe4fda9becf749639b375656240210&q=${city}`,
      )
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Weather App</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
      />

      {/* Search Button */}
      <button onClick={fetchWeather}>Search</button>

      {/* Loading message */}
      {loading && <p>Loading data...</p>}

      {/* Error Alert */}
      {error && alert('Failed to fetch weather data')}

      {/* Display Weather Data */}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
