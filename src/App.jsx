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
      <main className="bg-slate-900 p-16 rounded-xl w-236 h-118">
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <div className="section_weather-card-wrapper flex flex-col justify-between h-full">
            <h1 className="text-5xl font-bold mb-4">
              {data.location.name}, {data.location.country}
            </h1>
            <p className="text-8xl">{Math.round(data.weather.current.temp)}°C</p>
            <div className="weather-info flex gap-16 w-full justify-between">
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