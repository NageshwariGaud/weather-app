const API_KEY = "42091986b59c93adb2180581cb5c0c7f"; // Replace with your actual OpenWeatherMap API key

// Function to fetch weather data by city name
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeatherData(`q=${city}`);
    } else {
        alert("Please enter a city name.");
    }
}

// Function to fetch weather data by current location (using Geolocation)
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
            },
            () => alert("Location access denied. Please enter a city manually.")
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Main function to fetch and display weather data
async function fetchWeatherData(query) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (data.cod !== 200) {
            alert(data.message);
            return;
        }
        displayWeatherData(data);
    } catch (error) {
        alert("Failed to fetch weather data. Please try again later.");
    }
}

// Function to display weather data on the UI
function displayWeatherData(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById("description").innerText = `Description: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
