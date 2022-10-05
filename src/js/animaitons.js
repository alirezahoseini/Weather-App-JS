import Dom from './dom.js'
import UserCity from './userCity.js'
// classes 
const dom = new Dom()
const userCity = new UserCity()


class Animations {

  /* ------------------- 
  first page select city
  -------------------- */
  firstPageSelectCity() {
    const userData = userCity.checkLocalStorage();
    if(userData === null){
  
      dom.removeClassTimeOut(
        ".select_first_city--first_page",
        200,
        "animate_bottom"
      );
      dom.removeClassTimeOut(
        ".select_first_city--first_page .body--image",
        300,
        "animate_bottom"
      );
      dom.removeClassTimeOut(
        ".select_first_city--first_page .body--texts h1",
        450,
        "animate_bottom"
      );
      dom.removeClassTimeOut(
        ".select_first_city--first_page .body--texts p",
        650,
        "animate_bottom"
      );
      dom.removeClassTimeOut(
        ".select_first_city--first_page .body--texts button",
        800,
        "animate_bottom"
      );
    }
  }
  /* ------------------- 
  Switch in First page and Select City Page
  -------------------- */
  switchFirstPageAndSelectCityPage() {
    // Hidden First Page
    dom.addClassTimeOut(
      ".select_first_city--first_page .body--image",
      150,
      "animate_top"
    );
    dom.addClassTimeOut(
      ".select_first_city--first_page .body--texts h1",
      300,
      "animate_top"
    );
    dom.addClassTimeOut(
      ".select_first_city--first_page .body--texts p",
      350,
      "animate_top"
    );
    dom.addClassTimeOut(
      ".select_first_city--first_page .body--texts button",
      450,
      "animate_top"
    );
    dom.addClassTimeOut(".select_first_city--first_page", 500, "animate_top");
    dom.addClassTimeOut(".select_first_city--first_page", 980, "hidden");
  
    // Show Select Cite Page
    
    dom.removeClassTimeOut(
      ".select_first_city--selectbox",
      850,
      "animate_bottom"
    );
    dom.removeClassTimeOut(".select_first_city--selectbox", 800, "invisible");
    dom.removeClassTimeOut(
      ".select_first_city--selectbox .selectbox--image",
      700,
      "animate_bottom"
    );
    dom.removeClassTimeOut(
      ".select_first_city--selectbox .selectbox--founded_city_with_ip",
      850,
      "animate_bottom"
    );
    dom.removeClassTimeOut(
      ".select_first_city--selectbox .selectbox--founded_city_with_ip .buttons",
      900,
      "animate_bottom"
    );
  }
  /* ------------------- 
  Open Select city options
  -------------------- */
  openSelectCityOptions(){
    // Hidde Automatic founded city with ip 
    dom.addClass('.select_first_city--selectbox .selectbox--image', 'sm')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--founded_city_with_ip', 50 , "animate_top")
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--founded_city_with_ip', 50 , "h-0")

    // Showing Select city options
    // default citeis
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 5 ,'hidden')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 5 ,'h-0')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 100 ,'invisible')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 150 ,'animate_bottom')
    // line
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--line', 50 ,'h-0')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--line', 50 ,'flex')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--line', 55 ,'hidden')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--line', 200 ,'invisible')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--line', 250 ,'animate_bottom')
    // custom city
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 100 ,'h-0')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 105 ,'hidden')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 300 ,'invisible')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 350 ,'animate_bottom')
    // submit button
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 150 ,'h-0')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 155 ,'hidden')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 350 ,'invisible')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 450 ,'animate_bottom')
    // back button
    dom.removeClassTimeOut('#first_city--back_btn', 150 ,'invisible')
    dom.removeClassTimeOut('#first_city--back_btn', 155 ,'animate_left')
  }
   /* ------------------- 
    Close Select city options
  -------------------- */
  closeSelectCityOptions(){
    // Show Automatic founded city with ip 
    dom.removeClass('.select_first_city--selectbox .selectbox--image', 'sm')
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--founded_city_with_ip', 600 , "animate_top")
    dom.removeClassTimeOut('.select_first_city--selectbox .selectbox--founded_city_with_ip', 620 , "h-0");

     // Hidde Select city options
    // default citeis
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 250 ,'animate_bottom')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 650 ,'invisible')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 680 ,'h-0')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--default_cities', 690 ,'hidden')
    // line
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--line', 200 ,'animate_bottom')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--line', 600 ,'invisible')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--line', 620 ,'h-0')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--line', 640 ,'hidden')
    // custom city
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 100 ,'animate_bottom')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 500 ,'invisible')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 520 ,'h-0')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--custom_city', 545 ,'hidden')
    // submit button
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 1 ,'animate_bottom')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 300 ,'invisible')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 320 ,'h-0')
    dom.addClassTimeOut('.select_first_city--selectbox .selectbox--continue-btn', 340 ,'hidden')
    // back button
    dom.addClassTimeOut('#first_city--back_btn', 380 ,'invisible')
    dom.addClassTimeOut('#first_city--back_btn', 1 ,'animate_left')
  }
}





export default Animations