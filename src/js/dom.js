import Theme from "./theme.js";
const theme = new Theme();


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

  replaceClass(element, prevClass, newClass) {
    const selectedElem = document.querySelector(element);
    selectedElem.classList.remove(prevClass);

    setTimeout(() => {
      selectedElem.classList.add(newClass);
    }, 10);
  }
  // Show APP Page
  async showApp() {
    // // Access to user city from LS
    // const key = '72caee2eff37548de75d5d9674aa2510',
    //       userCityName = localStorage.getItem('userCity');
    
    // // created url
    // const url = `http://api.openweathermap.org/data/2.5/forecast?q=${userCityName}&appid=${key}`;
    // // send request
    // const request = await fetch(url).then((res) => res)
    // .catch((error) => {
    //   console.log(error)
    //   this.showMessage('Can not access to server, plase trun on your vpn', 'wifi', 'green');
    //   this.addClass("#loading", "hidde")
    // })
    // // access response
    // const response = await request.json();
    
    // if(await response.cod !== "404"){
    //   this.runApp(response)
    //   this.addClassTimeOut("#loading", 300, "hidde");
    //   this.removeClassTimeOut("#app", 100, "hidden");
    //   this.addClassTimeOut("#select_first_city", 100, "hidden");
    // }

      this.addClassTimeOut("#loading", 300, "hidde");
      this.removeClassTimeOut("#app", 100, "hidden");
      this.addClassTimeOut("#select_first_city", 100, "hidden");
      this.runApp()
      theme.firstLoadSetTheme()


  }
  // Show First page and select city
  showFirstPage() {
    this.addClassTimeOut("#loading", 300, "hidde");
    this.addClass("#select_first_city", "flex");
    this.removeClass("#select_first_city", "hidden");
  }
  // Show Message
  showMessage(message="default message", icon= "info", colorClass="red") {
    // set color
    let color = ''
    if(colorClass === 'blue') {
        color = 'bg-blue-600'
    }else if(colorClass === 'red') {
        color = 'bg-red-500'
    }else if(colorClass === 'green') {
        color = 'bg-green-600'
    }
    // access message box
    const messageBox = document.querySelector("#message_box");
    // create message tag
    const messageTag = document.createElement('div');
    messageTag.classList = 'message bg-white rounded-lg shadow-md p-3 w-11/12 flex justify-between items-center transition duration-700 my-2 invisible animate_bottom'
    messageTag.innerHTML = `
            <div class="message--body flex items-center">
            <i class="message--icon icon-light-${icon} text-2xl ${color} p-2 text-white rounded-lg"></i>
            <span class="message-text ml-2 text-sm px-3">
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
    }, 4000);
    // romowe from DOM
    setTimeout(() => {
        messageTag.remove()
    }, 4500);
  }
  // Run and create app
  runApp(data){
    localStorage.setItem('weather', JSON.stringify(data))
  }
  
}

export default Dom;
