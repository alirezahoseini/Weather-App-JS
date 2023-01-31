import IconFinder from "./iconFinder.js";
const iconFinder = new IconFinder();
class WeatherApp {
    // Set Realtime Weather
    async setRealtimeWeather(weatherData){
        console.log(weatherData)
        // Set user City
        const userCity = localStorage.getItem('userCity');
        const userCityTag = document.querySelector('#realtime_weather .location')
        userCityTag.innerHTML = userCity;

        // Set description
        const descriptionTag = document.querySelector('#realtime_weather .description')
        descriptionTag.innerHTML =  weatherData.weather[0].description;

        // Set weather temperature
        const tempTag = document.querySelector('#realtime_weather .temp')
        tempTag.innerHTML = Math.floor(weatherData.main.temp);

        // Set weather icon
        const weatherImgTag = document.querySelector('#realtime_weather .real-img img')
        weatherImgTag.src = await iconFinder.findIcon(weatherData);
        
        // Set More info ------- access to elements
        const moreInfo = document.querySelector('#more_data_section'),
              maxTempTag = moreInfo.querySelector('#max_temp h4'),
              minTempTag = moreInfo.querySelector('#min_temp h4'),
              humidityTag = moreInfo.querySelector('#humidity h4'),
              windTag = moreInfo.querySelector('#wind h4');

        
        maxTempTag.innerHTML = Math.round(weatherData.main.temp_max) + ' °';
        minTempTag.innerHTML = Math.round(weatherData.main.temp_min) + ' °';
        humidityTag.innerHTML = weatherData.main.humidity;
        windTag.innerHTML = weatherData.wind.speed;

    }
    // Next hours Weather 
    async nextHours(weatherData){
        console.log(weatherData)
        // access to the slider static childs
        const sliderChildes = document.querySelectorAll('.nextHours .swiper-slide');
        
        // Create next hours weathers in slider
        // weatherData.forEach((weather, index) => {
        //     // access slide element
        //     const slideElement = sliderChildes[index];
        //     /// access to the weather hours
        //     let time = (weather.dt_txt).split(" ")[1];
        //     time = time.slice(0,2);
        //     iconFinder.findIcon(time, weather)



        //     // // access to tags
        //     // const weatherInfo = slideElement.querySelector('.weather_info'),
        //     //       weatherIcon = slideElement.querySelector('.weather_icon'),
        //     //       weatherTime = slideElement.querySelector('.weather_time');
        //     // // set data
        //     // weatherInfo.innerHTML = weather.weather;
        //     // weatherIcon.src = icon;
        //     // weatherTime.innerHTML = time;
        //     // slideElement.setAttribute('timeId', index)

        //     // // active current time
        //     // if(currentTime === time){
        //     //     slideElement.classList.add('active');
        //     // }

        //     // // switching in times
        //     // slideElement.addEventListener('click', () => this.activeThisTime(index));
        // });
        for (let index = 0; index <= 35; index++) {
            const weather = weatherData[index]
            // access slide element
            const slideElement = sliderChildes[index];
            const icon = await iconFinder.findIcon(weather);

            console.log(icon)
        }
    }
    //
    activeThisTime(selectedTime){
        
        const weatherData = JSON.parse(localStorage.getItem('weather'))
        console.log(selectedTime);
        // Active time
        (function (){
            // access to the time slides
            const timeSlides = document.querySelectorAll('.nextHours .swiper-slide');
            // unActive last slide
            timeSlides.forEach((slide, index) => {
                if(slide.classList.contains('active')){slide.classList.remove('active')}
            });
            // active new slide
            timeSlides.forEach((slide, index) => {
                if(index === selectedTime){slide.classList.add('active')}
            });
        })()

        this.setRealtimeWeather(weatherData[selectedTime])
    }
    // Set Time and Date
    async setDateAndTime(){
        // Access to user city
        const userCity = localStorage.getItem('userCity');

        // base url and api key
        const url = 'https://api.ipgeolocation.io/timezone?apiKey=';
        const key = '05eb684275634618a6ef2f613715aef8';


        // Get Date and time from Api
        const response = fetch(`${url}${key}&location=${userCity}`,{
            headers: { 'X-Api-Key': key},
            contentType: 'application/json',
        }).then(res => {
            return res.json()
        }).catch(error => {
            console.log(error);
        })
        // Set date and time in Local storage
        localStorage.setItem('time', JSON.stringify(await response))
    
        // Extract time from api
        const data = await response;
        let timeData = data.time_24;
        timeData = timeData.split(':')
        timeData = {
            hour : timeData[0],
            minute : timeData[1],
            second : timeData[2]
        }

        //Extract Date data from api
        let dateData = {
            // Access day of week
            day : () => {
                let dayName = data.date_time_txt;
                dayName = dayName.split(',');
                dayName = dayName[0];
                return dayName;
            },
            date : data.date
        }


        
        // access to HTML elemnts 
        const dateTag = document.querySelector('#time_and_date .date');
        const timeTag = document.querySelector('#time_and_date .time');

        dateTag.innerHTML = `${dateData.day()}    /    ${dateData.date}`;
        timeTag.innerHTML = `${ timeData.hour }: ${timeData.minute} : ${timeData.second}`;
    
        // run clock
        this.runClock([timeData.hour, timeData.minute, timeData.second])
    }
    // Run clock
    runClock(timeData){
        // access to the loading classes
        const loadingClasses = document.querySelectorAll(`#time_and_date .loading_frame`);
        // remove classes
        loadingClasses.forEach(currentElement => currentElement.classList.remove('loading_frame'))
        // access to the data
        let hour = Number(timeData[0]),
        minute = Number(timeData[1]),
        seconde = Number(timeData[2]);

        // show values
        let showSeconde = '';
        let showMinute = '';
        let showHour = '';

        // access to the Elements
        const timeTag = document.querySelector('#time_and_date .time');

        setInterval(() => {
            // seconde --------------
            seconde++
            if(seconde > 59){
                seconde = 1;
            }
            // seconde fixer
            if(seconde < 10){
                showSeconde = `0${seconde}`;
            }else{
                showSeconde = seconde;
            }

            // minute ------------------
            if(seconde === 1){
                minute++
            }
            if(minute > 59){
                minute = 1
            }
            // minute fixer
            if(minute < 10){
                showMinute = `0${minute}`;
            }else{
                showMinute = minute;
            }

            // hour ---------------
            if(minute === 1){
                hour++
            }

            // hour fixer
            if(hour < 10){
                showHour = `0${hour}`;
            }else{
                showHour = hour;
            }

            timeTag.innerHTML = `${showHour} : ${showMinute} : ${showSeconde}`
        }, 1000);

    }

}

export default WeatherApp;