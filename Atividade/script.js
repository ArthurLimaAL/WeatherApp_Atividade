const getWeatherBtn = document.getElementById('get-weather-btn');
const citySelect = document.getElementById('city-choice');

const weatherIcon = document.getElementById('weather-icon');
const mainTemperature = document.getElementById('main-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');
const weatherMain = document.getElementById('weather-main');
const locationEl = document.getElementById('location');

const dataContainer = document.querySelector('.data-container');

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        if (!response.ok) {
            throw new Error('Something went wrong, please try again later');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function showWeather(city) {
    if (!city) return;

    try {
        const data = await getWeather(city);


        weatherIcon.src = data.weather?.[0]?.icon || '';
        mainTemperature.textContent = data.main?.temp !== undefined ? data.main.temp : 'N/A';
        feelsLike.textContent = data.main?.feels_like !== undefined ? data.main.feels_like : 'N/A';
        humidity.textContent = data.main?.humidity !== undefined ? data.main.humidity : 'N/A';
        wind.textContent = data.wind?.speed !== undefined ? data.wind.speed : 'N/A';
        windGust.textContent = data.wind?.gust !== undefined ? data.wind.gust : 'N/A';
        weatherMain.textContent = data.weather?.[0]?.main !== undefined ? data.weather[0].main : 'N/A';
        locationEl.textContent = data.name !== undefined ? data.name : 'N/A';

        dataContainer.style.display = 'block';
    } catch (err) {
        alert('Something went wrong, please try again later');
    }
}

getWeatherBtn.addEventListener('click', () => {
    const selectedCity = citySelect.value;
    showWeather(selectedCity);
});