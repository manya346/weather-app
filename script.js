async function fetchWeather(){
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "flex";
    const apiKey = "";

    if (searchInput == ""){
        weatherDataSection.innerHTML = `
        <div>
            <h2>Empty Input</h2>
            <p>Please enter a city name</p>
        </div>
        `;
        return;
    }
    async function getLonAndLat() {
        const countryCode = 91;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        if(!response.ok){
            console.log("Bad Response", response.status);
            return;
        }
        const data = await response.json();
        if(data.length == 0){
            console.log("No data found");
            weatherDataSection.innerHTML = `
            <div>
                <h2>No data found</h2>
                <p>Please enter a valid city name</p>
            </div>
            `;
            return;
        }
        else{
            return data[0];
        }
    }
    async function getWeatherData(lon, lat){
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if(!response.ok){
            console.log("Bad Response", response.status);
            return;
        }
        const data = await response.json();
        weatherDataSection.style.display = "flex";
        weatherDataSection.innerHTML = `
        <div>
            <h2>${data.name}</h2>
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)} C</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `
    }
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
}