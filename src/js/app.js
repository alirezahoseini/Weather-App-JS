import Dom from "./dom.js";
import UserCity from "./userCity.js";
import Animations from "./animaitons.js";
// classes
const dom = new Dom();
const userCity = new UserCity();
const animations = new Animations();

// Evenetlisteners
document.addEventListener("DOMContentLoaded", eventlisteners);
function eventlisteners() {
  // Run animations
  animations.firstPageSelectCity();
  //
  document
    .querySelector(".select_first_city--first_page .body--texts button")
    .addEventListener("click", animations.switchFirstPageAndSelectCityPage);
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
    userCity.setCityToloaclstorage()
  }
}



// Open select City And run select box
function openSelectCity() {
  // variables
  const wrongBtn = document.querySelector("#wrong_btn");
  const trueBtn = document.querySelector("#true_btn");
  // ***------*** Eventlisteners ***------***
  // Open Select options
  wrongBtn.addEventListener("click", () => {
    animations.openSelectCityOptions();
    // run select city form
    userCity.selectCity();
  });
}

// sendRequest()
// function sendRequest() {
//     fetch("https://key48798231.herokuapp.com/weather?city=tehran", {
//         method: "GET",
//     }).then((res) =>{
//         res.json().then(output => showResult(output))
//     }).catch(error =>{
//         console.log(error);
//     })
// }

// function showResult(data){
//     console.log(data)
// }

// sendRequest();
// function sendRequest() {
//   const url = "https://api.ipgeolocation.io/ipgeo?apiKey=";
//   const key = "05eb684275634618a6ef2f613715aef8";
//   fetch(url+key, {
//     method: "GET",
//   })
//     .then((res) => {
//       res.json().then((output) => showResult(output));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// function showResult(data) {
//   console.log(data);
// }
// const url = "https://api.ipgeolocation.io/ipgeo?apiKey=";
// const key = "05eb684275634618a6ef2f613715aef8";
