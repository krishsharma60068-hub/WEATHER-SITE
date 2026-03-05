const apiKey = "54c6719211fba59f54d552bb25b0a4b1";

function displayWeather(data) {
    document.getElementById("weatherCard").style.display = "block";

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById("description").innerText = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
        displayWeather(data);
    } else {
        alert("City not found");
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            displayWeather(data);
        });
    } else {
        alert("Geolocation not supported");
    }
}