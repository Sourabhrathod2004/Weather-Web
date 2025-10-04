async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (city === "") {
        resultDiv.innerHTML = "Please enter a city name!";
        return;
    }

    const apiKey = "de8079d74dce40a8863174459252909";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const cityName = data.location.name;
        const country = data.location.country;
        const tempC = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const humidity = data.current.humidity;
        const wind_kph = data.current.wind_kph;

        // Update background based on weather condition
        let body = document.body;
        if (condition.toLowerCase().includes("rain")) {
            body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
        } else if (condition.toLowerCase().includes("cloud")) {
            body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
        } else if (condition.toLowerCase().includes("sun") || condition.toLowerCase().includes("clear")) {
            body.style.background = "linear-gradient(to right, #f6d365, #fda085)";
        } else if (condition.toLowerCase().includes("snow")) {
            body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
        } else {
            body.style.background = "linear-gradient(to right, #6dd5fa, #2980b9)";
        }

        resultDiv.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <img src="https:${icon}" alt="${condition}">
            <p>Temperature: ${tempC}°C</p>
            <p>Condition: ${condition}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${wind_kph} kph</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "Error: " + error.message;
    }
}
