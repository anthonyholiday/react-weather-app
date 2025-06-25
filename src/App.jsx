import { useState, useEffect, useRef } from 'react'
import { fetchWeatherData, getEpochDate } from './api'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    fetchWeatherData()
      .then(data => setData(data))
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      // Get the card's size and position relative to the viewport
      const cardRect = card.getBoundingClientRect();
      
      // Calculate the position of the mouse relative to the card's top-left corner
      const x = e.clientX - cardRect.left; // X coordinate within the card
      const y = e.clientY - cardRect.top;  // Y coordinate within the card
      
      // Find the center of the card
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      
      // Calculate the rotation angles based on mouse position
      // Multiply by 15 for a stronger tilt effect
      const rotateX = ((y - centerY) / centerY) * 5; // Tilt on the X-axis (up and down)
      const rotateY = ((centerX - x) / centerX) * 5; // Tilt on the Y-axis (left and right)
      
      // Apply the calculated rotation to the card
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      // Reset the card's rotation when the mouse leaves
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function to remove event listeners
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="App h-full flex flex-col items-center">
      <main 
        ref={cardRef}
        className="p-16 rounded-xl w-236 h-full border border-slate-700 shadow-xl transform-3d transition ease-in duration-200 hover:border-slate-400 hover:scale-101 hover:shadow-2xl"
        id="weather-card">
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <div className="section_weather-card-wrapper flex flex-col justify-between h-full gap-8">
            <h1 className="text-5xl font-bold mb-4">
              {data.location.name}, {data.location.country}
            </h1>
            <p className="text-8xl">{Math.round(data.weather.current.temp)}°C</p>
            <p className="text-2xl">{data.weather.daily[0].summary}</p>
            <div className="weather-info flex gap-16 w-full justify-between">
                <p>Feels like: {Math.round(data.weather.current.feels_like)}°C</p>
                <p>Weather: {data.weather.current.weather[0].description}</p>
                <p>Humidity: {data.weather.current.humidity}%</p>
                <p>Wind Speed: {data.weather.current.wind_speed} m/s</p>
                <p>UV: {data.weather.current.uvi}</p>
                <p>Sunrise: {getEpochDate(data.weather.current.sunrise)}</p>
                <p>Sunset: {getEpochDate(data.weather.current.sunset)}</p>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}

export default App