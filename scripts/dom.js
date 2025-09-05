// dom.js
// DOM manipulation and UI logic for Weather App
// Handles sidebar, menu, loading, weather display, and user interactions

const sidebar = document.querySelector("#side-bar");
const menu = document.querySelector(".menu");
const BLUR_MENU = document.querySelector(".BLUR_MENU");
const mode = document.querySelector("#mode");
const loding = document.querySelector(".loding");
const currentWeatherCard = document.querySelector(".Current-Sky");
const fiveDaysForcastCard = document.querySelector(".Daily-Forecast");
const airPolution = document.querySelector(".aire-pol");
const airQuality = document.querySelector(".air-quality");
const content = document.querySelector(".content");
const page_notFound = document.querySelector(".page_not-found");
const SunsetSunrise = document.querySelector(".Sunset-Sunrise");
//
const humidityVal = document.querySelector(".humidity");
const pressureVal = document.querySelector(".pressure");
const storm = document.querySelector(".storm");
const visibilityVal = document.querySelector(".visibility");
const temerature = document.querySelector(".temerature");
const locationbtn = document.querySelector(".localisation");
/**
 * Loading Screen Handler
 * ---------------------
 * This block ensures that when the page loads, a loading screen is displayed for 5 seconds.
 * After 5 seconds, the loading screen is hidden by replacing the 'grid' class with 'hidden'.
 * The 'overflow-hidden' class is also removed from the <body> to re-enable scrolling on the page.
 * This provides a smooth user experience by preventing interaction with the page while content is loading.
 */
setTimeout(function() {
    loding.classList.replace("grid", "hidden"); // Hide loading overlay
    document.body.classList.remove("overflow-hidden"); // Allow page scrolling
}, 5000);

/**
 * addAnimation
 * -------------
 * Adds animation to the weather cards by replacing the translate-y class.
 * This is used to animate cards into view after certain actions.
 */
function addAnimation() {
    const cards = document.querySelector(".card");
    cards.classList.replace("translate-y-[-10px]", "translate-y-[0]");
}

/**
 * menuSetting
 * -------------
 * Toggles the sidebar menu and blur overlay visibility.
 * Used for opening/closing the sidebar navigation on mobile and desktop.
 */
function menuSetting() {
    if (!menu.classList.contains("fa-bars")) {
        sidebar.classList.toggle("h-[auto]");
        sidebar.classList.toggle("opacity-100");
        sidebar.classList.toggle("p-10");
        if (!BLUR_MENU.classList.contains("hidden")) {
            BLUR_MENU.classList.add("hidden");
        } else {
            BLUR_MENU.classList.remove("hidden");
        }
    }
}
mode.addEventListener("click", function() {
    document.body.classList.toggle("mode");
    if (!mode.classList.contains("fa-moon")) {
        mode.classList.replace("fa-sun", "fa-moon");
    } else {
        mode.classList.replace("fa-moon", "fa-sun");
    }
});
menu.addEventListener("click", () => {
    menuSetting();
});
BLUR_MENU.addEventListener('click', function(e) {
    menuSetting();
});

//
const API_KEY = "b5865745f8ff4bf227f7d052b80c6025";
content.classList.replace("grid", "hidden");
page_notFound.classList.replace("hidden", "flex");
page_notFound.innerHTML = ` 
 <img class="md:w-50 w-20" src="images/weather-forecast.png" alt="">
<h1 class="md:text-5xl  text-xl">Welcome to WeatherNow</h1>
<p class="text-[var(--secondary-color)] py-5">Enter your city to check the weather</p>
       `

/**
 * getWetherDetatile
 * ------------------
 * Fetches and displays current weather, 5-day forecast, and air pollution data
 * for the given location (name, lon, lat, country, state).
 * Updates the UI with weather cards, forecast, and air quality info.
 */
function getWetherDetatile(name, lon, lat, country, state) {
    const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    const wetherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const AIR_POLUTION_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const day = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        aqiList = [
            'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'
        ]

    fetch(wetherAPI).then(resp => resp.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
                <div class="Current flex    border-b-1  gap-4 border-b-slate-500    justify-between items-center p-2 mb-4">
                    <h1 class="flex flex-col font-bold text-4xl"> <span class="text-[var(--secondary-color)] text-lg font-mono">Now</span>${(data.main.temp- 273.15).toFixed(2)}°C<span class="text-[var(--secondary-color)] text-lg font-mono">${data.weather[0].description}</span> </h1>
                    <img class="w-20" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=" ">
                </div>
                <!-- date -->
                <p class="date text-[var(--secondary-color)] text-xs font-mono"><i class="fa-solid fa-calendar"></i> ${day[date.getDay()]},${date.getDate()} ${months[date.getMonth()]},${date.getFullYear()}</p>
                <!-- location -->
                <p class="location text-[var(--secondary-color)] text-xs font-mono"><i class="fa-solid fa-location-dot"></i>${name},${country} </p>

            `

        let { sunrise, sunset } = data.sys, { visibility, timezone } = data, { feels_like, humidity, pressure } = data.main, { speed } = data.wind;
        let sunriseTime = moment.unix(sunrise).utc().add(timezone, 'seconds').format('hh:mm A');
        let sunsiteTime = moment.unix(sunset).utc().add(timezone, 'seconds').format('hh:mm A')
        SunsetSunrise.innerHTML = `

        <div class="flex  items-center"><img class="md:w-30 w-20" src="images/sunrise.png" alt="">
           <p class="text-[var(--secondary-color)] text-xs font-mono">sunrice <br><span class="text-[var(--accent-color)] text-2xl">${sunriseTime}</span></p>
        </div>
        <div class="flex  items-center"> <img class="md:w-30 w-20" src="images/sunset.png" alt="">
           <p class="text-[var(--secondary-color)] text-xl font-mono">sunset <br><span class="text-[var(--accent-color)] text-2xl">${sunsiteTime}</span></p>
        </div>`
        console.log(data);

        humidityVal.innerHTML = `${humidity} %`;
        pressureVal.innerHTML = `${pressure} hPa`;
        visibilityVal.innerHTML = `${visibility/1000} Km`;
        storm.innerHTML = `${speed}m/s`;
        temerature.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;

    }).catch(error => console.error(error))
    fetch(forecastAPI).then(resp => resp.json()).then(data => {
        let uniqueForcastDays = [];
        let fiveDayForcast = data.list.filter(forcast => {
            let forcastDate = new Date(forcast.dt_txt).getDate();
            if (!uniqueForcastDays.includes(forcastDate)) {
                return uniqueForcastDays.push(forcastDate);
            }
        })
        fiveDaysForcastCard.innerHTML = "";
        for (let i = 0; i < fiveDayForcast.length; i++) {
            let date = new Date(fiveDayForcast[i].dt_txt)
            fiveDaysForcastCard.innerHTML += ` 
        <li class="flex justify-around items-center p-2 ">
         <img class="md:w-20 w-15" src="https://openweathermap.org/img/wn/${fiveDayForcast[i].weather[0].icon}.png" alt=" ">
        <span class="text-[var(--secondary-color)] md:text-xl text-xs font-mono">${(fiveDayForcast[i].main.temp)}°C</span> 
        <span class="text-[var(--secondary-color)] md:text-xl text-xs font-mono">${date.getDate()},${months[date.getMonth()]}</span> 
        <span class="text-[var(--secondary-color)] md:text-xl text-xs font-mono">${day[date.getDay()]}</span></li>`
        }
        let hourlyForcast = data.list

        let hourlyForcastCard = document.querySelectorAll(".Weekly-Outlook")

        for (let i = 0; i <= 8; i++) {
            let hrForcast = new Date(hourlyForcast[i].dt_txt);
            let hr = hrForcast.getHours();
            let a = "AM";
            if (hr > 12) a = 'PM';
            if (hr == 0) hr = 12;
            if (hr > 12) hr = hr - 12;

            hourlyForcastCard[i].innerHTML = `
              <div class="bg-[var(--primary-color)] flex justify-center  px-2 items-center flex-col   rounded-2xl">
                        <h2>${hr} ${a}</h2>
                     <img class="w-20" src="https://openweathermap.org/img/wn/${hourlyForcast[i].weather[0].icon}.png" alt=" ">
                        <h2>${(hourlyForcast[i].main.temp)}°C</h2>
                    </div>`
        }

    }).catch(error => console.error(error));
    fetch(AIR_POLUTION_API_URL).then(resp => resp.json()).then(data => {

        const { co, no, no2, o3, so2, nh3, pm2_5, pm10 } = data.list[0].components
        airPolution.innerHTML = `
                                    <li class="flex items-center justify-center flex-col"><i class="fa-solid fa-wind text-3xl"></i></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">co<span class="text-[var(--accent-color)] text-2xl">${co}</span></li>
                                 <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">no <span class="text-[var(--accent-color)] text-2xl">${no}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">no2 <span class="text-[var(--accent-color)] text-2xl">${no2}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">o3 <span class="text-[var(--accent-color)] text-2xl">${o3}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">so2 <span class="text-[var(--accent-color)] text-2xl">${so2}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">nh3 <span class="text-[var(--accent-color)] text-2xl">${nh3}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">pm2_5 <span class="text-[var(--accent-color)] text-2xl">${pm2_5}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">pm10 <span class="text-[var(--accent-color)] text-2xl">${pm10}</span></li>
                                    <li class="flex items-center justify-center flex-col text-[var(--secondary-color)] text-xl font-mono">PM2.5 <span class="text-[var(--accent-color)] text-2xl">${co}</span></li>
               `;
        airQuality.textContent = aqiList[data.list[0].main.aqi]

    }).catch(error => console.error(error));
}

/**
 * getCordoneCityName
 * -------------------
 * Gets the city name from the search input, fetches its coordinates,
 * and updates the weather details for that city. Handles errors and UI updates.
 */
function getCordoneCityName() {
    const nameCity = searchCity.value.trim();
    const GET_CORDONNEAPI_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${nameCity}&appid=${API_KEY}`;
    fetch(GET_CORDONNEAPI_URL).then(res => res.json()).then(data => {
        const { name, lon, lat, country, state } = data[0];
        getWetherDetatile(name, lon, lat, country, state);
        content.classList.replace("hidden", "grid");
        page_notFound.classList.replace("flex", "hidden");
        page_notFound.innerHTML = "";
    }).catch(error => {
        content.classList.replace("grid", "hidden");
        page_notFound.classList.replace("hidden", "flex");
        page_notFound.innerHTML = ` 
        <img class="w-40" src="images/error-404.png" alt="">
        <h1 class="text-[var(--secondary-color)] text-4xl font-bold p-5">Page nout found </h1>
        <p class="text-[var(--secondary-color)] text-xl font-mono">soory the page you requested cloud</p>`
        console.error(error);
    })
    if (page_notFound.innerHTML !== "") {
        content.classList.replace("hidden", "grid");
        page_notFound.classList.replace("flex", "hidden");
        page_notFound.innerHTML = "";
    }
}
locationbtn.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude } = position.coords;
        const RefrencegeolocationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        fetch(RefrencegeolocationAPI).then(data => data.json()).then(data => {
            const { name, country, state } = data;
            console.log(data)
            getWetherDetatile(name, longitude, latitude, country, state);
            content.classList.replace("hidden", "grid");
            page_notFound.classList.replace("flex", "hidden");
            page_notFound.innerHTML = "";

        }).catch(error => console.error(error))
    })
    menuSetting();
    addAnimation();
});
//
const btnSherch = document.querySelector("#btnSherch");
const searchCity = document.querySelector("#search-city");
//
searchCity.addEventListener("keydown", function(e) {
    const nameCity = e.target.value.trim();
    if (e.key === "Enter" && nameCity !== "") {
        getCordoneCityName();
        searchCity.value = "";
        menuSetting();
        addAnimation();
    }
})
btnSherch.addEventListener("click", function() {
    if (searchCity.value !== "") {
        getCordoneCityName();
        searchCity.value = "";
        menuSetting();
        addAnimation();
    }
});