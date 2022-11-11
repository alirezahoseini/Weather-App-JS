import Dom from "./dom.js";
const dom = new Dom();

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
      // if server not response affter 10s , show error
      let showError = setTimeout(() => {
        dom.showVpnError();
      }, 10000);

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
      const customCityValue = document.querySelector("#custom_city").value,
        defaultCitiesValue = document.querySelector("#default_cities").value;

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
    const key = '72caee2eff37548de75d5d9674aa2510';

    // created url
    const url = `https://key48798231.herokuapp.com/weather?input=${city}`;
    // send request
    const request = await fetch(url).then((res) => res)
      .catch((error) => {
        dom.showVpnError()
        dom.addClass("#loading", "hidde")
        console.log(error)
      })
    // access response
    const response = await request.json();


    // check response error
    if(request.status === 200){
      // Go to app
      dom.addClass("#select_first_city", "hidden");
      localStorage.setItem('userCity', city)
      dom.showApp();
    }else{
      // Back to select City
      dom.addClass('#loading', 'hidde')
      dom.showMessage('Your city Not Found, Try again ', 'info', 'danger')
    }

  }
}

export default UserCity;
