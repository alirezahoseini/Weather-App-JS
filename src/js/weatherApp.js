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
        const moreInfo = document.querySelector('#more_data_section'),
              maxTemp = moreInfo.querySelector('#max_temp h4'),
              minTemp = moreInfo.querySelector('#min_temp h4'),
              humidity = moreInfo.querySelector('#humidity h4'),
              wind = moreInfo.querySelector('#wind h4');
            //   sunriseTag = moreInfo.querySelector('#sunrise span'),
            //   sunsetTag = moreInfo.querySelector('#sunset span');

        // console.log(moreInfo)
        
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
        // // set to HTML
        // sunriseTag.innerHTML = sunriseTime;
        // sunsetTag.innerHTML = sunsetTime;
        


              
    }
    // Next hours Weather 
    nextHours(weatherData){
        const slider = document.querySelector('#next_hours_weather .nextHours .swiper-wrapper');
        const date = new Date();
        const hours = date.getHours();

        // Create next hours weathers in slider
        weatherData.forEach((weather, index) => {
            /// access to the weather hours
            let time = (weather.date).split(" ")[1];
            time = time.slice(0,5);
            // set icon by any hours
            let icon = '';
            switch (time) {
                case "18:00":
                    icon = icon = weather.day_icon;;
                    break;
                case "21:00":
                    icon = icon = weather.night_icon;;
                    break;
                case "00:00":
                    icon = icon = weather.night_icon;;
                    break;
                case "03:00":
                    icon = icon = weather.night_icon;;
                    break;
                case "06:00":
                    icon = icon = weather.day_icon;;
                    break;
                case "09:00":
                    icon = icon = weather.day_icon;;
                    break;
                case "12:00":
                    icon = icon = weather.day_icon;;
                    break;
                case "15:00":
                    icon = icon = weather.day_icon;;
                    break;
                default:
                    icon = icon = weather.day_icon;;
                    break;
            }

            /// Access to current time
            let currentTime = '';
            if(hours >= 18 && hours < 21){
                currentTime = '18:00';
            }else if(hours >= 21 && hours < 24){
                currentTime = '21:00';
            }else if(hours >= 24 || hours < 3){
                currentTime = "00:00"
            }else if(hours >= 3 && hours < 6){
                currentTime = '03:00'
            }else if(hours >= 6 && hours < 9){
                currentTime = '06:00'
            }else if(hours >= 9 && hours < 12){
                currentTime = '09:00'
            }else if(hours >= 12 && hours < 15){
                currentTime = '12:00'
            }else if(hours >= 15 && hours < 18){
                currentTime = '15:00'
            }



            if(currentTime === time){
                slider.innerHTML += `
                <!-- Start slide ${index}  -->
                <div class="swiper-slide active flex flex-col rounded-2xl dark:bg-slate-800 py-3  items-center justify-between relative">
                    <span class="text-white">${weather.weather}</span>
                    <img src="${icon}">
                    <span class="font-bold text-white dark:text-slate-100">${time}</span>
                </div>
                <!-- End of slide ${index}  -->
                `
            }else{
                slider.innerHTML += `
                <!-- Start slide ${index}  -->
                <div class="swiper-slide flex flex-col bg-gray-50 dark:bg-slate-800 py-3 rounded-2xl items-center justify-between relative">
                    <span class="text-slate-800 dark:text-white">${weather.weather}</span>
                    <img src="${icon}">
                    <span class="font-bold text-slate-800 dark:text-slate-100">${time}</span>
                </div>
                <!-- End of slide ${index}  -->
                `
            }


        });
        
    
    
    }
    // Run Realtime Clock 


}

export default WeatherApp;