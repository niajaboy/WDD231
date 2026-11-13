const API_KEY = 'e6d8d16373b414af0e36b0c60d5d5195'; 
const LAT = 9.8965; // Jos, Plateau State, Nigeria
const LON = 8.8583;
const UNITS = 'metric'; 

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

export async function initWeather() {
    const currentContainer = document.getElementById('current-weather');
    const forecastContainer = document.getElementById('weather-forecast');

    if (!currentContainer || !forecastContainer) return;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(CURRENT_URL),
            fetch(FORECAST_URL)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error(`Weather API error (${currentRes.status} / ${forecastRes.status})`);
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        renderCurrentWeather(currentData, currentContainer);
        renderForecast(forecastData, forecastContainer);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        currentContainer.innerHTML = '<p>Current weather is temporarily unavailable.</p>';
        forecastContainer.innerHTML = '<p>3-day forecast is temporarily unavailable.</p>';
    }
}

function renderCurrentWeather(data, container) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const humidity = data.main.humidity;

    container.innerHTML = `
        <div class="weather-main">
            <img src="${iconUrl}" alt="${description} weather icon" width="64" height="64">
            <p class="current-temp">${temp}&deg;C</p>
        </div>
        <p class="weather-desc">${description}</p>
        <p>Humidity: ${humidity}%</p>
    `;
}

function renderForecast(data, container) {
    const todayStr = new Date().toISOString().split('T')[0];

    // Pick midday (12:00:00) forecasts for the next 3 days
    let nextThreeDays = data.list
        .filter((entry) => !entry.dt_txt.startsWith(todayStr) && entry.dt_txt.includes('12:00:00'))
        .slice(0, 3);

    // Fallback if fewer than 3 midday slots exist late in the day
    if (nextThreeDays.length < 3) {
        const seenDates = new Set();
        nextThreeDays = data.list
            .filter((entry) => {
                const datePart = entry.dt_txt.split(' ')[0];
                if (datePart !== todayStr && !seenDates.has(datePart)) {
                    seenDates.add(datePart);
                    return true;
                }
                return false;
            })
            .slice(0, 3);
    }

    container.innerHTML = nextThreeDays
        .map((day) => {
            const date = new Date(day.dt * 1000);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
            const temp = Math.round(day.main.temp);
            const desc = day.weather[0].description;

            return `
                <div class="forecast-row">
                    <span class="forecast-day">${weekday}:</span>
                    <span class="forecast-temp"><strong>${temp}&deg;C</strong> (${desc})</span>
                </div>
            `;
        })
        .join('');
}