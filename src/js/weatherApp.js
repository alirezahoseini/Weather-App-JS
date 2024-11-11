import GetApis from "./getApis.js";
const getApis = new GetApis();
class WeatherApp {
  // Set Realtime Weather
  async setRealtimeWeather(weatherData) {
    // Set user City
    const userCity = localStorage.getItem("userCity");
    const userCityTag = document.querySelector("#realtime_weather .location");
    userCityTag.innerHTML = userCity;

    // Set description
    const descriptionTag = document.querySelector(
      "#realtime_weather .description"
    );
    descriptionTag.innerHTML = weatherData.weather[0].description;

    // Set weather temperature
    const tempTag = document.querySelector("#realtime_weather .temp");
    tempTag.innerHTML = Math.floor(weatherData.main.temp);

    // Set weather icon
    const weatherImgTag = document.querySelector(
      "#realtime_weather .real-img img"
    );
    weatherImgTag.src = await getApis.findIcon(weatherData);

    // Set More info ------- access to elements
    const moreInfo = document.querySelector("#more_data_section"),
      maxTempTag = moreInfo.querySelector("#max_temp h4"),
      minTempTag = moreInfo.querySelector("#min_temp h4"),
      humidityTag = moreInfo.querySelector("#humidity h4"),
      windTag = moreInfo.querySelector("#wind h4");

    maxTempTag.innerHTML = weatherData.main.temp_max + " °";
    minTempTag.innerHTML = weatherData.main.temp_min + " °";
    humidityTag.innerHTML = weatherData.main.humidity;
    windTag.innerHTML = weatherData.wind.speed;
  }
  // Next hours Weather
  async nextHours(weatherData) {
    /* -------------------------------
         Get time and find current hour
        ------------------------------- */
    let cityHour = await getApis.getTime();
    cityHour = cityHour.watch.hour;

    // access to the slider static childs
    const sliderChildes = document.querySelectorAll(".nextHours .swiper-slide");

    // access to the current hour in weather data
    let currentHour = "";
    for (let index = 0; index < weatherData.length; index++) {
      /// access to the weather hours
      let time = weatherData[index].dt_txt.split(" ")[1];
      time = time.slice(0, 2);

      // console.log(time)
      if (time === cityHour) {
        currentHour = index;
        break;
      }
    }

    // cuting finally items from weather data array
    const finallyItems = weatherData.slice(currentHour, currentHour + 7);

    // Set to day weather to local storage
    localStorage.setItem("toDayWeather", JSON.stringify(finallyItems));

    // Create next hours weathers in slider
    finallyItems.forEach(async (weather, index) => {
      // access to te time
      let time = weather.dt_txt.split(" ")[1];
      time = time.slice(0, 2);

      // access slide element
      const slideElement = sliderChildes[index];
      // access to tags
      const weatherInfo = slideElement.querySelector(".weather_info"),
        weatherIcon = slideElement.querySelector(".weather_icon"),
        weatherTime = slideElement.querySelector(".weather_time");
      // set data
      weatherInfo.innerHTML = weather.weather[0].main;
      weatherIcon.src = await getApis.findIcon(weather);
      weatherTime.innerHTML = time + ":00";
      slideElement.setAttribute("timeId", index);

      // active current time
      if (index == 0) {
        slideElement.classList.add("active");
      }

      // switching in times
      slideElement.addEventListener("click", () => this.activeThisTime(index));
    });

    // Remove loading frame on next hour
    this.removeLoadingFrame("nextHours");
    for (let index = 0; index <= 35; index++) {
      const weather = weatherData[index];
      // access slide element
      const slideElement = sliderChildes[index];
      const icon = await getApis.findIcon(weather);
    }
  }

  //
  activeThisTime(selectedTime) {
    // access to to day weather from local storage
    const weatherData = JSON.parse(localStorage.getItem("toDayWeather"));
    // Active time
    function run() {
      // access to the time slides
      const timeSlides = document.querySelectorAll(".nextHours .swiper-slide");
      // unActive last slide
      timeSlides.forEach((slide, index) => {
        if (slide.classList.contains("active")) {
          slide.classList.remove("active");
        }
      });
      // active new slide
      timeSlides.forEach((slide, index) => {
        if (index === selectedTime) {
          slide.classList.add("active");
        }
      });
    }
    run();

    this.setRealtimeWeather(weatherData[selectedTime]);
  }
  // Set Time and Date
  async setDateAndTime() {
    // Extract time from api
    const time = await getApis.getTime();

    // access to HTML elemnts
    const dateTag = document.querySelector("#time_and_date .date");
    const timeTag = document.querySelector("#time_and_date .time");

    dateTag.innerHTML = `${time.dayName}    /    ${time.date}`;
    timeTag.innerHTML = `${time.watch.hour}: ${time.watch.minute} : ${time.watch.second}`;

    // run clock
    this.runClock([time.watch.hour, time.watch.minute, time.watch.second]);
  }
  // Run clock
  runClock(timeData) {
    // access to the loading classes
    const loadingClasses = document.querySelectorAll(
      `#time_and_date .loading_frame`
    );
    // remove classes
    loadingClasses.forEach((currentElement) =>
      currentElement.classList.remove("loading_frame")
    );
    // access to the data
    let hour = Number(timeData[0]),
      minute = Number(timeData[1]),
      seconde = Number(timeData[2]);

    // show values
    let showSeconde = "";
    let showMinute = "";
    let showHour = "";

    // access to the Elements
    const timeTag = document.querySelector("#time_and_date .time");

    setInterval(() => {
      // seconde --------------
      seconde++;
      if (seconde > 59) {
        seconde = 1;
      }
      // seconde fixer
      if (seconde < 10) {
        showSeconde = `0${seconde}`;
      } else {
        showSeconde = seconde;
      }

      // minute ------------------
      if (seconde === 1) {
        minute++;
      }
      if (minute > 59) {
        minute = 1;
      }
      // minute fixer
      if (minute < 10) {
        showMinute = `0${minute}`;
      } else {
        showMinute = minute;
      }

      // hour ---------------
      if (minute === 1) {
        hour++;
      }

      // hour fixer
      if (hour < 10) {
        showHour = `0${hour}`;
      } else {
        showHour = hour;
      }

      timeTag.innerHTML = `${showHour} : ${showMinute} : ${showSeconde}`;
    }, 1000);
  }
  // Remove loading frame
  removeLoadingFrame(elementId) {
    // access to the loading classes
    const loadingClasses = document.querySelectorAll(
      `#${elementId} .loading_frame`
    );
    // remove classes
    loadingClasses.forEach((currentElement) =>
      currentElement.classList.remove("loading_frame")
    );
  }
  // Run seconde city
  async runSecondeCity() {
    // access to seconde city from local storage
    const userCity = localStorage.getItem("secondeCity").toLocaleLowerCase();

    // show seconde city section
    document
      .querySelector("#secondeCity .seconde-city-info")
      .classList.remove("hidden");

    // Access to seconde city weather
    let weather = await getApis.getWeather(userCity);
    this.removeLoadingFrame("secondeCity");

    // Set user City
    const userCityTag = document.querySelector("#secondeCity .location");
    userCityTag.innerHTML = userCity;

    // Set description
    const descriptionTag = document.querySelector("#secondeCity .description");
    descriptionTag.innerHTML = weather.list[0].weather[0].description;

    // Set weather temperature
    const tempTag = document.querySelector("#secondeCity .temp");
    tempTag.innerHTML = Math.floor(weather.list[0].main.temp);

    // Set weather icon
    const weatherImgTag = document.querySelector("#secondeCity .real-img img");
    weatherImgTag.src = await getApis.findIcon(weather.list[0]);

    // Set More info ------- access to elements
    const moreInfo = document.querySelector("#secondeCity .more-weather"),
      maxTempTag = moreInfo.querySelector("#max_temp h4"),
      minTempTag = moreInfo.querySelector("#min_temp h4"),
      humidityTag = moreInfo.querySelector("#humidity h4"),
      windTag = moreInfo.querySelector("#wind h4");

    maxTempTag.innerHTML = weather.list[0].main.temp_max + " °";
    minTempTag.innerHTML = weather.list[0].main.temp_min + " °";
    humidityTag.innerHTML = weather.list[0].main.humidity;
    windTag.innerHTML = weather.list[0].wind.speed;
  }
}

export default WeatherApp;
