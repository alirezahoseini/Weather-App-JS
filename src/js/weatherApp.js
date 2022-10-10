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
        
        // Set More info ------- access to elements
        const moreInfo = document.querySelector('#realtime_weather #more-info'),
              maxTemp = moreInfo.querySelector('#max-temp span'),
              minTemp = moreInfo.querySelector('#min-temp span'),
              humidity = moreInfo.querySelector('#humidity span'),
              wind = moreInfo.querySelector('#wind span'),
              sunriseTag = moreInfo.querySelector('#sunrise span'),
              sunsetTag = moreInfo.querySelector('#sunset span');

        
        maxTemp.innerHTML = Math.round(weatherData.temp_max) + ' °';
        minTemp.innerHTML = Math.round(weatherData.temp_min) + ' °';
        humidity.innerHTML = weatherData.humidity;
        wind.innerHTML = weatherData.wind;

        // calculate Times
        let timezone = weatherData.timezone;
        let sunrise = weatherData.sunrise;
        let sunset = weatherData.sunset;
        // convert timezone
        let sunriseTime = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm');
        let sunsetTime = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm');
        // set to HTML
        sunriseTag.innerHTML = sunriseTime;
        sunsetTag.innerHTML = sunsetTime;
        


              
    }

}

export default WeatherApp;