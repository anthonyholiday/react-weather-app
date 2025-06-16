function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

export function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "\nLongitude: " + position.coords.longitude);
}

getLocation()

export const fetchWeatherData = () => {
    return fetch("http://api.openweathermap.org/geo/1.0/direct?q=lisboa,PT&limit=1&appid=4f2a20ec1f06401b3d05e13261625633")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const lat = data[0].lat
            const lon = data[0].lon
            const weather = fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily&appid=3bef3c5e53663333556ee7731fc82d1c`)
                .then(res => res.json())
                .then(data => {
                    return data
                })
            return weather;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};

//NEW - https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//OLD - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}