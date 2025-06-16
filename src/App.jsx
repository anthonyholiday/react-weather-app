import { useState, useEffect } from 'react'
import { fetchWeatherData } from './api'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData()
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <section className="App h-full flex flex-col items-center">
      <main className="bg-gray-900 p-16 rounded-xl">
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <div className="section_weather-card-wrapper">
            <h1 className="text-2xl font-bold mb-4">
              {data.location.name}, {data.location.country}
            </h1>
            <div className="weather-info">
              <p>Temperature: {Math.round(data.weather.current.temp)}°C</p>
              <p>Feels like: {Math.round(data.weather.current.feels_like)}°C</p>
              <p>Weather: {data.weather.current.weather[0].description}</p>
              <p>Humidity: {data.weather.current.humidity}%</p>
              <p>Wind Speed: {data.weather.current.wind_speed} m/s</p>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}

export default App