async function getWeatherData(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1e82349fa7c94a1cacf163038240806&q=${location}`,  {mode: 'cors'});
    console.log(response);
    return response;
};

async function processJSONData(apiData){
    const weatherData = await apiData.json()
    console.log(weatherData);

    const location = weatherData.location.name
    const country = weatherData.location.country
    const condition = weatherData.current.condition.text
    const temperature = weatherData.current.temp_f
    const icon = weatherData.current.condition.icon
    const humidity = weatherData.current.humidity
    const windSpeed = weatherData.current.wind_kph

    
    return{
        location,
        condition,
        temperature,
        icon,
        country,
        windSpeed,
        humidity,
    }
};
async function checkWeatherStatus(location){
    const LocationData = await getWeatherData(`${location}`);
    const locationProcessedData = await processJSONData(LocationData);
    UpdateScreen(locationProcessedData);
}


function searchLocation(){
    const input = document.querySelector('input');
    const searchIcon = document.querySelector('img');

    searchIcon.addEventListener('click', async () => {
        await checkWeatherStatus(input.value);
        console.log("am clicked")
    });
    input.addEventListener('keydown', async (e) => {
        if(e.keyCode === 13){
            await checkWeatherStatus(input.value);
            console.log("am clicked") 
        }
    })
}

function UpdateScreen(location){
    const image = document.querySelector('.replace');
    const tempDiv = document.getElementById('temp');
    const locationDiv = document.getElementById('location');
    const speedDiv = document.getElementById('speed');
    const humidityDiv = document.getElementById('humidity');
    const conditionDiv = document.getElementById('condition');


    if (image && location.icon) {
        image.src = location.icon;
    } else {
        console.error('Image element not found or icon URL missing');
    }

    locationDiv.innerText = `${location.country} ${location.location}`;
    tempDiv.innerText = `${rundOff(location.temperature)}°C `
    speedDiv.innerText = `${location.windSpeed} Km/h`
    humidityDiv.innerText =`${location.humidity}%`
    conditionDiv.innerText = `${location.condition}`
}

function rundOff(num){
    return Math.round(parseInt(num));
}
checkWeatherStatus("kenya");
searchLocation();

