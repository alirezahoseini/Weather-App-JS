// Classes
import Dom from "./dom.js";
const dom = new Dom();

// Evenetlisteners
document.addEventListener("DOMContentLoaded", eventlisteners);
function eventlisteners() {
  // Run animations
  firstPageSelectCity();
  //
  dom
    .select(".select_first_city--first_page .body--texts button")
    .addEventListener("click", switchFirstPageAndSelectCityPage);
}

/* ------------------- 
first page select city
-------------------- */
function firstPageSelectCity() {
  // Variables
  dom.removeClassTimeOut(
    ".select_first_city--first_page",
    200,
    "animate_bottom"
  );
  dom.removeClassTimeOut(
    ".select_first_city--first_page .body--image",
    400,
    "animate_bottom"
  );
  dom.removeClassTimeOut(
    ".select_first_city--first_page .body--texts h1",
    500,
    "animate_bottom"
  );
  dom.removeClassTimeOut(
    ".select_first_city--first_page .body--texts p",
    700,
    "animate_bottom"
  );
  dom.removeClassTimeOut(
    ".select_first_city--first_page .body--texts button",
    800,
    "animate_bottom"
  );
}

/* ------------------- 
Switch in First page and Select City Page
-------------------- */
function switchFirstPageAndSelectCityPage() {
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
