import Theme from "./theme.js";
import WeatherApp from "./weatherApp.js";
const theme = new Theme();
const weatherApp = new WeatherApp();


class Dom {
  removeClassTimeOut(elementId, time, classValue) {
    const selectedElement = document.querySelector(elementId);
    setTimeout(() => {
      selectedElement.classList.remove(classValue);
    }, time);
  }
  removeClass(elementId, classValue) {
    const selectedElement = document.querySelector(elementId);
    selectedElement.classList.remove(classValue);
  }
  addClassTimeOut(elementId, time, classValue) {
    const selectedElement = document.querySelector(elementId);
    setTimeout(() => {
      selectedElement.classList.add(classValue);
    }, time);
  }
  addClass(elementId, classValue) {
    const selectedElement = document.querySelector(elementId);
    selectedElement.classList.add(classValue);
  }

  // Show APP Page
  async showApp() {
    const key = '72caee2eff37548de75d5d9674aa2510';

    // show app page
    this.removeClassTimeOut("#app", 300, "hidden");
    // set theme
    theme.firstLoadSetTheme()
    // hidde loading
    this.addClassTimeOut("#loading", 500, "hidde");
    // hidde first select city page
    this.addClass("#select_first_city", "hidden");

    // Access to user city from LS
    const userCityName = localStorage.getItem('userCity').toLowerCase();


    // created url
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${userCityName}&appid=${key}&units=metric`;
    // send request
    const request = await fetch(url).then((res) => res)
      .catch((error) => {
        console.log(error)
      })
    // access response
    const response = await request.json();

    // check response error
    if (request.status === 200) {
      this.runApp(response)
      this.addClassTimeOut("#select_first_city", 100, "hidden");
    } else {
      this.showVpnError()
    }
  }
  // Show First page and select city
  showFirstPage() {
    this.addClassTimeOut("#loading", 300, "hidde");
    this.addClass("#select_first_city", "flex");
    this.removeClass("#select_first_city", "hidden");
  }
  // Show Message
  showMessage(message = "default message", icon = "info", colorClass = 'success') {
    // access message box
    const messageBox = document.querySelector("#message_box");
    // create message tag
    const messageTag = document.createElement('div');
    messageTag.classList = `message ${colorClass} duration-700 invisible animate_bottom`;
    messageTag.innerHTML = `
        <div class="message--body">
          <i class="message--icon icon-${icon}"></i>
          <span class="message-text">
              ${message}
          </span>
        </div>
        `;
    // apeend and show message
    messageBox.appendChild(messageTag)
    messageTag.classList.remove('invisible')
    // slide on
    setTimeout(() => {
      messageTag.classList.remove('animate_bottom')
    }, 100);
    // slide out
    setTimeout(() => {
      messageTag.classList.add('animate_top')
    }, 5000);
    // romowe from DOM
    setTimeout(() => {
      messageTag.remove()
    }, 5500);
  }
  // Run and create app
  runApp(data) {
    localStorage.setItem('weather', JSON.stringify(data));
    weatherApp.setDateAndTime();


    // Access to the weather data
    const weatherData = data.list;

    weatherApp.setRealtimeWeather(weatherData[0]);
    weatherApp.nextHours(weatherData);

    // Remove loading frame classes
    weatherApp.removeLoadingFrame('main_weather');
    weatherApp.removeLoadingFrame('more_data_section');
  }
  // Background hiddden Closer popups
  backgroundHidden() {
    const bg = document.querySelector('#hidden_background_section');
    // access to elements for closeing
    const app = document.querySelector('#app'),
      themeSwitcherMenu = document.querySelector('#switcher_menu'),
      changeCityPopup = document.querySelector('#change_city_popup'),
      changeCityForm = document.querySelector('#change_city_form')
    bg.addEventListener('click', () => {
      // Close Theme Switcher
      if (themeSwitcherMenu.classList.contains('active')) {
        app.classList.remove('blur');
        themeSwitcherMenu.classList.remove('active');
        bg.classList.remove('active')
      } else if (changeCityPopup.classList.contains('active')) {
        app.classList.remove('blur');
        changeCityPopup.classList.remove('active');
        bg.classList.remove('active')
      } else if (changeCityForm.classList.contains('active')) {
        changeCityForm.classList.remove('active');
        changeCityPopup.classList.add('active')
        this.resetChangeCityForm()
      }
    })
  }
  // Show Vpn error
  showVpnError() {
    // access to the Elements
    const appElem = document.querySelector('#app'),
      selectFirstCityElem = document.querySelector('#select_first_city'),
      vpnErrorElem = document.querySelector('#vpn_error'),
      errorTextBox = vpnErrorElem.querySelector('#error-text');

    // Blur bg
    appElem.classList.add('blur');
    selectFirstCityElem.classList.add('blur');

    // Show error
    vpnErrorElem.classList.add('active');
    setTimeout(() => {
      errorTextBox.classList.remove('animate_bottom')
    }, 500);
  }
  /*---------------------------
   Chnage city Popup and form 
  ---------------------------*/
  openChangeCityPopup() {
    // Access to the Elements
    const changeCityPopup = document.querySelector('#change_city_popup'),
      backgroundSection = document.querySelector('#hidden_background_section'),
      app = document.querySelector('#app');

      // Open it
    backgroundSection.classList.add('active')
    app.classList.add('blur');
    changeCityPopup.classList.add('active');
  }
  openChangeFirstCityForm() {
    // Access to Elements
    const form = document.querySelector('#change_city_form'),
      popup = document.querySelector('#change_city_popup'),
      title = form.querySelector('.title');

    // Open it
    form.classList.add('active')
    popup.classList.remove('active')
    title.children[0].classList.add('indigo')
    title.children[1].innerHTML = 'Change your city';

    // Set Form Status
    form.setAttribute('form-status', 'firstCity')
  }
  openChangeSecondeCityForm() {
    // Access to Elements
    const form = document.querySelector('#change_city_form'),
      popup = document.querySelector('#change_city_popup'),
      title = form.querySelector('.title');

    // Open it
    form.classList.add('active')
    popup.classList.remove('active')
    title.children[0].classList.add('purple')
    title.children[1].innerHTML = 'Add or change seconde city';

    // Set Form Status
    form.setAttribute('form-status', 'secondeCity')
  }
  closeChangeCityPopup() {
    // Access to Elements
    const changeCityPopup = document.querySelector('#change_city_popup'),
      backgroundSection = document.querySelector('#hidden_background_section'),
      app = document.querySelector('#app');
    // close it
    backgroundSection.classList.remove('active')
    app.classList.remove('blur');
    changeCityPopup.classList.remove('active')
  }
  closeChangeCityForm() {
    // Access to Elements
    const changeCityPopup = document.querySelector('#change_city_popup'),
      changeCityForm = document.querySelector('#change_city_form');

    // close it
    changeCityPopup.classList.add('active')
    changeCityForm.classList.remove('active')
  }
  resetChangeCityForm() {
    const formElement = document.querySelector('#change_city_form'),
      customCityInput = formElement.querySelector('#custom-city'),
      defaultCiteisInput = formElement.querySelector('#default-cities'),
      title = formElement.querySelector('.title'),
      submitBtn = document.querySelector('#change_city_form #submit-form');


    customCityInput.value = '';
    defaultCiteisInput.value = 'null';
    formElement.setAttribute('form-status', 'null');
    submitBtn.classList.remove('active');
    submitBtn.setAttribute('disabled', true);

    if (title.children[0].classList.contains('purple')) {
      title.children[0].classList.remove('purple')
    } else if (title.children[0].classList.contains('indigo')) {
      title.children[0].classList.remove('indigo')
    }
  }
  changeCityFormValidation(value){
    // create regEx Pattern 
    const pattern = /\s|[1-9]|[!@#$%^&.*()_+]/g;

    // validation
    if(value.length < 3){
      return false
    }else if(value.match(pattern)){
       return false;
    }else{
       return true;
    }
  }



}

export default Dom;
