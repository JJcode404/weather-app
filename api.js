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
async function checkWeatherStatus(){
    const kenyaData = await getWeatherData("kenya");
    const kenyaProcessedData = processJSONData(kenyaData);
    console.log(kenyaProcessedData)
}

checkWeatherStatus();
