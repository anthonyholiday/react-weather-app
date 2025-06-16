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
    <section className="App h-full flex flex-col items-center">
      <main className="bg-gray-900 p-16 rounded-xl">
        <h1>🇵🇹 Lisbon</h1>
        {error && <p className="error">Error: {error}</p>}
        {weatherData && (
          <div className="section_weather-card-wrapper">
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        )}
      </main>
    </section>
  )
}

export default App
