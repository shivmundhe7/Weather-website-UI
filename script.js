const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const WeatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countrytxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt'); // ✅ Fixed selector
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValuetTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const apiKey = '76a9ea1e63640877014f462ebee7be79';


searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});


cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const {
        name: Country,
        main: { temp, humidity },
        weather: [{ main }],
        wind: { speed }
    } = weatherData;

    countrytxt.textContent = Country;
    tempTxt.textContent = temp + ' °C';
    conditionTxt.textContent = main; // ✅ Update the condition name here
    humidityValueTxt.textContent = humidity + '%';
    windValuetTxt.textContent = speed + ' m/s';
    weatherSummaryImg.src = `/assets/weather/${main.toLowerCase()}.svg`;

    const today = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    currentDateTxt.textContent = today.toLocaleDateString('en-US', options);

    showDisplaySection(WeatherInfoSection);
}

function showDisplaySection(section) {
    [WeatherInfoSection, searchCitySection, notFoundSection].forEach(sec => {
        sec.style.display = 'none';
    });

    section.style.display = 'flex';
}
