// Fetch the required elements
const fetchDataBtn = document.getElementById('fetch-data-btn');
const weatherApp = document.getElementById('weather-app');
const landingPage = document.getElementById('landing-page');
const latitudeSpan = document.getElementById('latitude');
const longitudeSpan = document.getElementById('longitude');
const mapDiv = document.getElementById('map');

// Weather data spans
const locationSpan = document.getElementById('location');
const windSpeedSpan = document.getElementById('wind-speed');
const humiditySpan = document.getElementById('humidity');
const timezoneSpan = document.getElementById('timezone');
const pressureSpan = document.getElementById('pressure');
const windDirectionSpan = document.getElementById('wind-direction');
const uvIndexSpan = document.getElementById('uv-index');
const feelsLikeSpan = document.getElementById('feels-like');

// OpenWeatherMap API key
const API_KEY = 'your-openweather-api-key'; // Replace with your OpenWeatherMap API key

// Geolocation API success callback
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the coordinates
    latitudeSpan.textContent = latitude.toFixed(6);
    longitudeSpan.textContent = longitude.toFixed(6);

    // Show the weather app and hide the landing page
    landingPage.classList.add('hidden');
    weatherApp.classList.remove('hidden');

    // Embed Google Maps
    mapDiv.innerHTML = `<iframe width="100%" height="300px" src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" frameborder="0"></iframe>`;

    // Fetch the weather data
    fetchWeatherData(latitude, longitude);
}

// Geolocation API error callback
function error() {
    alert('Unable to retrieve your location.');
}

// Fetch weather data using OpenWeatherMap API
function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationSpan.textContent = data.name;
            windSpeedSpan.textContent = `${data.wind.speed} km/h`;
            humiditySpan.textContent = `${data.main.humidity}%`;
            timezoneSpan.textContent = `GMT ${data.timezone / 3600}`;
            pressureSpan.textContent = `${data.main.pressure} hPa`;
            windDirectionSpan.textContent = `${data.wind.deg}°`;
            uvIndexSpan.textContent = data.uvi; // Only available with One Call API
            feelsLikeSpan.textContent = data.main.feels_like;
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
        });
}

// Add event listener for the button
fetchDataBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
document.getElementById('latitude').innerText = '28.7041';
document.getElementById('longitude').innerText = '77.1025';
document.getElementById('location').innerText = 'New Delhi, India';
document.getElementById('wind-speed').innerText = '12';
document.getElementById('humidity').innerText = '60';
document.getElementById('timezone').innerText = 'IST (UTC+5:30)';
document.getElementById('pressure').innerText = '1015';
document.getElementById('wind-direction').innerText = '180';
document.getElementById('uv-index').innerText = '5';
document.getElementById('feels-like').innerText = '35';
