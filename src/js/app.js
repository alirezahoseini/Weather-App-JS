import Dom from "./dom.js";
import UserCity from "./userCity.js";
import Animations from "./animaitons.js";
import Theme from "./theme.js";
// classes
const dom = new Dom();
const userCity = new UserCity();
const theme = new Theme();
const animations = new Animations();

// Evenetlisteners
document.addEventListener("DOMContentLoaded", eventlisteners);
function eventlisteners() {
  // Run background hidden closer popups
  dom.backgroundHidden()
  // Run animations
  animations.firstPageSelectCity();
  // Switch first page to select city page
  document
    .querySelector(".select_first_city--first_page .body--texts button")
    .addEventListener("click", animations.switchFirstPageAndSelectCityPage);
  // Switch Theme Button ---- Dark and light
  document.querySelector('#switcher_btn').addEventListener('click', themeSwitcher)
  // Run change city
  document.querySelector('#change_city_popup_button').addEventListener('click', dom.openChangeCityPopup)
  // Run them switcher menu -- theme selector 
  theme.themeChengerBtn();
  // Close change city popup with Back button
  document.querySelector('#change_city_popup .back-btn').addEventListener('click', dom.closeChangeCityPopup)
  // Close change city Form with Back button
  document.querySelector('#change_city_form .back-btn').addEventListener('click', () => {
    dom.closeChangeCityForm()
    dom.resetChangeCityForm()
  });
  // Submit change cityu form
  document.querySelector('#change_city_form #submit-form').addEventListener('click', (event) => userCity.submitChangeCityForm(event))
  // 
  document.querySelector('#secondeCity .add-city-button').addEventListener('click', dom.openChangeCityPopup)
}

/*-------------------
     Functions 
-------------------*/
// Automatic Show Pages
showPages();
function showPages() {
  const userCityData = userCity.checkLocalStorage();
  if (userCityData !== null) {
    dom.showApp();
  } else {
    userCity.accessUserCityWithIp();
    dom.showFirstPage();
    openSelectCity();
    userCity.setCityToloaclstorage();
  }
}


// Open select City And run select box
function openSelectCity() {
  // variables
  const wrongBtn = document.querySelector("#wrong_btn"),
    trueBtn = document.querySelector("#true_btn"),
    backBtn = document.querySelector("#first_city--back_btn");
  // ***------*** Eventlisteners ***------***
  // Open Select options
  wrongBtn.addEventListener("click", () => {
    animations.openSelectCityOptions();
    // run select city form
    userCity.selectCity();
  });
  // Open App page
  trueBtn.addEventListener('click', () => {
    // set auto city to user city
    const autoCity = localStorage.getItem('autoUserCity');
    localStorage.setItem('userCity', autoCity)
    localStorage.removeItem('autoUserCity');
    // show and run app
    dom.removeClass('#loading', 'hidde')
    dom.showApp()
  })
  // Close Select options
  backBtn.addEventListener('click', () => animations.closeSelectCityOptions())

}


// Open Switch Theme Menu ---- just opn it
function themeSwitcher() {
  const menu = document.querySelector('#switcher_menu'),
    bgSection = document.querySelector('#hidden_background_section'),
    app = document.querySelector('#app');

  // open themes menu
  menu.classList.add('active');
  bgSection.classList.add('active');
  app.classList.add('blur');
}


// change City popup -----
(async function() {
  ///------- add eventlisteners on inner sections (open first and seconde forms)
  const changeFirstCityBtn = document.querySelector('#change-first-city-button'),
    changeSecondeCityBtn = document.querySelector('#change-seconde-city-button')
  changeFirstCityBtn.addEventListener('click', dom.openChangeFirstCityForm);
  changeSecondeCityBtn.addEventListener('click', dom.openChangeSecondeCityForm);


  ///------ validation and submit form
  const customCityInput = document.querySelector('#change_city_form #custom-city'),
  defaultCitiesInput = document.querySelector('#change_city_form #default-cities'),
  submitBtn = document.querySelector('#change_city_form #submit-form');

  // chack custom city
  customCityInput.addEventListener('input', () => {
  //  text validation
  const isValidCoustomCity = dom.changeCityFormValidation(customCityInput.value);
  /// cleare default city input
  if(defaultCitiesInput.value !== 'null'){
      // clear default city value
      defaultCitiesInput.value = 'null';
  }
  // Active and deActive submit btn
  if(isValidCoustomCity == true && defaultCitiesInput.value == 'null'){
    activeSubmitButton()
  }else{
    deActivateSubmitButton()
  }

  })

  // chack default city
  defaultCitiesInput.addEventListener('change', () => {
    if(customCityInput.value === '' && defaultCitiesInput.value == 'null'){
      deActivateSubmitButton();
    }else if(customCityInput.value !== 'null'){
      customCityInput.value = '';
      activeSubmitButton();
    }
  });

  // Active submit button
  function activeSubmitButton(){
    submitBtn.classList.add('active');
    submitBtn.removeAttribute('disabled');
  }

  // deActivate submit button 
  function deActivateSubmitButton(){
    submitBtn.classList.remove('active');
    submitBtn.setAttribute('disabled', true);
  }
})()



