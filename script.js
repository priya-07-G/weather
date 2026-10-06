const API_KEY = "deca2698cfa802941cf744f4c369cfb7";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    try {

        error.textContent = "";

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Display city
        document.getElementById("cityName").textContent =
            data.name;

        // Display temperature
        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)} °C`;

        // Display weather condition
        document.getElementById("description").textContent =
            data.weather[0].description;

        // Display humidity
        document.getElementById("humidity").textContent =
            data.main.humidity;

        // Display wind speed
        document.getElementById("wind").textContent =
            data.wind.speed;

        // Weather icon
        const iconCode = data.weather[0].icon;

        const iconURL =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherIcon").src = iconURL;

    } catch (error) {

        document.getElementById("error").textContent =
            "City not found. Please enter a valid city.";
    }
}