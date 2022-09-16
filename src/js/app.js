import Dom from './dom.js'
import UserCity from './userCity.js'
// classes 
const dom = new Dom()
const userCity = new UserCity()

showPages()
function showPages(){
    const userCityData = userCity.checkLocalStorage();
    if(userCityData !== null){
        showApp()
    }else{
        showFirstPage()
    }
}


function showApp(){
    console.log('app');
}

function showFirstPage(){
    console.log('firstPage'); 
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
