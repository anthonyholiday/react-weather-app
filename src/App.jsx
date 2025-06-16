import { useState, useEffect } from 'react'
import { fetchWeatherData } from './api'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData()
      .then(data => setWeatherData(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      {error && <p className="error">Error: {error}</p>}
      {weatherData && (
        <div className="weather-data">
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
