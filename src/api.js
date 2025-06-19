export function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    console.log("Coordinates:", coords);
                    resolve(coords);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

export const fetchWeatherData = async () => {
    try {
        const coords = await getLocation();
        
        // Make both API calls in parallel
        const [weatherResponse, cityResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&exclude=minutely,hourly&appid=3bef3c5e53663333556ee7731fc82d1c`),
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=3bef3c5e53663333556ee7731fc82d1c`)
        ]);

        if (!weatherResponse.ok || !cityResponse.ok) {
            throw new Error(`HTTP error! Weather status: ${weatherResponse.status}, City status: ${cityResponse.status}`);
        }

        const [weatherData, cityData] = await Promise.all([
            weatherResponse.json(),
            cityResponse.json()
        ]);

        // Combine the data
        const combinedData = {
            weather: weatherData,
            location: cityData[0] // The first result from reverse geocoding
        };

        console.log('Weather data:', weatherData);
        console.log('City data:', cityData[0]);
        
        return combinedData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};