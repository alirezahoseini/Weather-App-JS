import Dom from "./dom.js";
import GetApis from "./getApis.js";
const dom = new Dom();
const getApis = new GetApis();


class UserCity {
  // Checking localstorage for exist city
  checkLocalStorage() {
    const userCity = localStorage.getItem("userCity");
    return userCity;
  }
  // Send request to the api and access to user city with IP v2
  accessUserCityWithIp() {
    sendRequest();
    function sendRequest() {
      const url = "https://api.ipgeolocation.io/ipgeo?apiKey=";
      const key = "05eb684275634618a6ef2f613715aef8";
      fetch(url + key, {
        method: "GET",
      })
        .then((res) => {
          // set result
          res.json().then((output) => setResult(output));
          clearTimeout(showError)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function setResult(data) {
      // set user city and Geographical coordinates to local storage and show to page
      localStorage.setItem("autoUserCity", data.city);
      document
        .querySelector("#city_with_ip")
        .setAttribute("value", `${data.city} / ${data.country_name}`);
    }
  }
  // Select city Form Handler
  selectCity() {
    // access to the inputs
    const defaultCitiesInput = document.querySelector("#default_cities");
    const customCityInput = document.querySelector("#custom_city");

    defaultCitiesInput.addEventListener("change", (event) => {
      // clear custom city
      customCityInput.value = "";
      // inputs validation
      this.selectInputsValidation();
    });
    customCityInput.addEventListener("input", (event) => {
      // clear default cities
      defaultCitiesInput.value = null;
      // inputs validation
      this.selectInputsValidation();
    });
  }
  // Select city form validation
  selectInputsValidation() {
    // Ccess to the values
    const defaultCitiesValue = document.querySelector("#default_cities").value;
    const customCityValue = document.querySelector("#custom_city").value;

    const continueBtn = document.querySelector(".selectbox--continue-btn");
    // set tailwind classes
    const classes = ["opacity-50", "cursor-not-allowed"];

    // cheacking Default cities
    if (
      (defaultCitiesValue === "null" ||
        (defaultCitiesValue === null && customCityValue !== ""),
        customCityValue.length > 2)
    ) {
      continueBtn.classList.remove(...classes);
      continueBtn.removeAttribute('disabled');
      // cheacking Custom city
    } else if (
      customCityValue === "" &&
      defaultCitiesValue !== null &&
      defaultCitiesValue !== "null"
    ) {
      continueBtn.classList.remove(...classes);
      continueBtn.removeAttribute('disabled');
    } else {
      continueBtn.classList.add(...classes);
      continueBtn.setAttribute('disabled', "true");
    }
  }
  // Set Selected city to localstorage
  setCityToloaclstorage() {
    // access to elements
    const continueBtn = document.querySelector(".selectbox--continue-btn"),
      loading = document.querySelector("#loading");

    continueBtn.addEventListener('click', () => {
      let customCityValue = document.querySelector("#custom_city").value;
      customCityValue = customCityValue.toLowerCase()
      const defaultCitiesValue = document.querySelector("#default_cities").value;

      // Checking custom city
      if (customCityValue !== "") {
        // show loading
        loading.classList.remove('hidde');
        // checking
        this.checkingCustomCity(customCityValue)
      }
      else {
        // set Default city to local storage and go to app page
        localStorage.setItem('userCity', defaultCitiesValue);
        dom.removeClass('#loading', 'hidde');
        dom.showApp()
      }
    })
  }
  // Checking custom city 
  async checkingCustomCity(city) {
    // Access to user city from LS
    const key = '72caee2eff37548de75d5d9674aa2510';
    // created url
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
    // send request
    const request = await fetch(url).then((res) => res)
      .catch((error) => {
        dom.addClass("#loading", "hidde")
        console.log(error)
      })
      .catch((error) => {
        dom.addClass("#loading", "hidde")
        console.log(error)
      })
    // access response
    const response = await request.json();

    console.log(response)

    // check response error
    if (request.status === 200) {
      // Go to app
      dom.addClass("#select_first_city", "hidden");
      localStorage.setItem('userCity', city)
      dom.showApp();
    } else {
      // Back to select City
      dom.addClass('#loading', 'hidde')
      dom.showMessage('Your city Not Found, Try again ', 'info', 'danger')
    }

  }
  // Submit Change city form
  async submitChangeCityForm(event){
    event.preventDefault()
    
    // Access to elments
    const form = document.querySelector('#change_city_form');
    const status = form.getAttribute('form-status'),
          customCityInput = document.querySelector('#change_city_form #custom-city'),
          defaultCitiesInput = document.querySelector('#change_city_form #default-cities'),
          loading = document.querySelector('#change_city_form #loading');


    let city = '';

    // Default city
    if(customCityInput.value === '' && defaultCitiesInput.value !== null){
      city = defaultCitiesInput.value;
    // custom city 
    }else if(defaultCitiesInput.value == 'null' && customCityInput.value !== '' ){
      loading.classList.add('active')
      /// Chacking city with api
      const isValidCity = await getApis.chackingCoustomCity(customCityInput.value);
      // Show error
      if (isValidCity == false){
        loading.classList.remove('active')
        dom.showMessage('Your city Not Found, Try again ', 'info', 'danger')
      }else{
        // Set city
        city = customCityInput.value;
      }
    }

    // chacking form status and set city to localStorage
    if(city !== '' && city !== null){
      if(status === 'firstCity'){
        // Set first city
        localStorage.setItem('userCity', city)
        window.location.reload();
      }else if (status === 'secondeCity'){
        // set seconde city
        localStorage.setItem('secondeCity', city)
        window.location.reload();
      }
    }
  }
}

export default UserCity;
