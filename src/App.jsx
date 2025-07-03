import { useState, useEffect, useRef } from 'react'
import { fetchWeatherData, getEpochDate } from './api'
import './App.css'
import Tag from "../components/tag.jsx" 

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
    <>
    <Tag handle="@anthonyholiday" bgColor="bg-slate-800" textColor="text-white" link="https://github.com/anthonyholiday"/>
    <section className="App h-auto lg:h-full flex flex-col justify-items-start lg:items-center">
      <main 
        ref={cardRef}
        className="p-8 lg:p-16 rounded-xl lg:w-236 w-full h-full border border-slate-700 shadow-xl transform-3d transition ease-in duration-200 hover:border-slate-400 hover:scale-101 hover:shadow-2xl"
        id="weather-card">
        {error && <p className="error">Error: {error}</p>}
        {data && (
          <div className="section_weather-card-wrapper flex flex-col justify-between h-full">
            <div>
              <h1 className="text-2xl lg:text-5xl font-bold mb-4">
                {data.location.name}, {data.location.country}
              </h1>
              <p className="text-5xl lg:text-8xl mb-8">{Math.round(data.weather.current.temp)}°C</p>
            </div>
            <p className="text-xl lg:text-2xl lg:mb-16 mb-8">{data.weather.daily[0].summary}</p>
            <div className="weather-info flex flex-col gap-4 lg:flex-row lg:gap-16 lg:w-full lg:justify-between">
                <p>Feels like: <strong>{Math.round(data.weather.current.feels_like)}°C</strong></p>
                <p>Weather: <strong>{data.weather.current.weather[0].description}</strong></p>
                <p>Humidity: <strong>{data.weather.current.humidity}%</strong></p>
                <p>Wind Speed: <strong>{data.weather.current.wind_speed} m/s</strong></p>
                <p>UV: <strong>{data.weather.current.uvi}</strong></p>
                <p>Sunrise: <strong>{getEpochDate(data.weather.current.sunrise)}</strong></p>
                <p>Sunset: <strong>{getEpochDate(data.weather.current.sunset)}</strong></p>
            </div>
          </div>
        )}
      </main>
    </section>
    </>
  );
}

export default App