class WeatherApp {

    // Set Realtime Weather
    setRealtimeWeather(weatherData){
        // Set user City
        const userCity = localStorage.getItem('userCity');
        const userCityTag = document.querySelector('#realtime_weather .location')
        userCityTag.innerHTML = userCity;

        // Set description
        const descriptionTag = document.querySelector('#realtime_weather .description')
        descriptionTag.innerHTML =  weatherData.weather_description;

        // Set weather temperature
        const tempTag = document.querySelector('#realtime_weather .temp')
        tempTag.innerHTML = Math.floor(weatherData.temp_now);

        // Set weather icon
        const weatherImgTag = document.querySelector('#realtime_weather .real-img img')
        const date = new Date();
        const hours = date.getHours();
        if(hours > 19 || hours < 6){
            weatherImgTag.src = weatherData.night_icon;
        }else{
            weatherImgTag.src = weatherData.day_icon;
        }
        console.log(weatherData)
    }

}

export default WeatherApp;