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
            const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4f2a20ec1f06401b3d05e13261625633`)
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