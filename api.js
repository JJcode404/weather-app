async function getWeatherData(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1e82349fa7c94a1cacf163038240806&q=${location}`,  {mode: 'cors'});
    console.log(response);
    return response;
};

async function processJSONData(apiData){
    const weatherData = await apiData.json()
    console.log(weatherData);

    const location = weatherData.location.localtime
    const condition = weatherData.current.condition.text
    const temperature = weatherData.current.temp_f
    return{
        location,
        condition,
        temperature
    }
};
async function checkWeatherStatus(location){
    const LocationData = await getWeatherData(`${location}`);
    const locationProcessedData = processJSONData(LocationData);
    console.log(locationProcessedData)
}

// checkWeatherStatus();
function searchLocation(){
    const input = document.querySelector('input');
    const searchIcon = document.querySelector('img');
    searchIcon.addEventListener('click', async () => {
        await checkWeatherStatus(input.value);
        console.log("am clicked")
    });
}

searchLocation();
