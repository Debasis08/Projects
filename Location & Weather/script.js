const button = document.querySelector('.btn');
const box = document.querySelector('.box');
const container = document.querySelector('.container');
const hide = document.getElementById('large_block')
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const KELVIN = 273;
const key = "b4394b23fba9e0e4f3e1ba927dde98e8";

const weather = {};

weather.temperature = {
    unit: "celsius"
}

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition( setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geolocation.</p>";
    // notificationElement.innerHTML = `<p>${error.message}</p>`
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
    }

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
    .then(function(response) {
        let data = response.json();
        return data;
    })
    // console.log(data)
    .then( function (data) {
        weather.temperature.value = Math.trunc(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then( function() {
        displayWeather();
    });
}

function displayWeather() {
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
    
    descElement.innerHTML = weather.description;
    
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};

function celsiusToFahrenheit( temperature ) {
    return (temperature * 9/5) + 32;
}

function toggleBlocks() {
    button.classList.toggle('open');

    //   var currentMarginTop = parseInt(getComputedStyle(button).marginTop, 3);
    //   var newMarginTop = currentMarginTop - 1; // Adjust the amount you want the block to move up

      // Apply the new margin-top and trigger the transition
      button.style.marginBottom = '20em';
      button.style.position = 'fixed';
      button.style.transition = "all ease 0.8s";
    }

button.addEventListener('click',() => {
    navigator.geolocation.getCurrentPosition(position => {
        
        // Getting latitude & longitude from position obj
        const { latitude, longitude} = position.coords;
        console.log(latitude, longitude);
        // Getting location of passed coordinates using geocoding Api
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
        .then(res => res.json())
        .then(data=>{
        const addressComponents = data.address || {};
        const locationInfo = document.getElementById('locationInfo');
        console.log(data.display_name);
        locationInfo.innerHTML = `
            <p><strong>Latitude:</strong> ${latitude}</p><br/>
            <p><strong>Longitude:</strong> ${longitude}</p><br/>
            <p><strong>Address:</strong> ${data.display_name}</p><br/>
            <ul>
            <li>${addressComponents.road || ''}</li>
            <li>${addressComponents.city || ''}</li>
            <li>${addressComponents.state || ''}</li>
            <li>${addressComponents.county || ''}</li>
            <li>${addressComponents.country || ''}</li>
            <li>${addressComponents.postcode || ''}</li>
        </ul>
        `;
        
        button.innerHTML = "Here is your required information";
        // locationInfo.style.display = 'block';
        // tap.style.display = 'flex';
        tap.style.flexDirection = 'column';
        hide.style.display = 'flex';
        hide.style.transition = 'opacity 0.6s ease'
        hide.style.flexDirection = 'row';
        // hide.classList.remove('hidden'); 
    }
        )
        .catch(() => {
            console.log("Error fetching data from API");
        }
        );

    })

    tempElement.addEventListener('click',() => {
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.trunc(fahrenheit);
        tempElement.innerHTML = `${fahrenheit} ° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})
toggleBlocks();

})