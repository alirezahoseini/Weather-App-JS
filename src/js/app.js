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
  // Run them switcher menu -- theme selector 
  theme.themeChengerBtn();
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
  trueBtn.addEventListener('click', () => dom.showApp())
  // Close Select options
  backBtn.addEventListener('click', () => animations.closeSelectCityOptions())
  
}


// Open Switch Theme Menu ---- Dark and light
function themeSwitcher(){
  const menu = document.querySelector('#switcher_menu'),
  bgSection = document.querySelector('#hidden_background_section'),
  app = document.querySelector('#app');
  
  // open themes menu
  menu.classList.add('active');
  bgSection.classList.add('active');
  app.classList.add('blur');
}