
class Theme {
   // Set app theme affter loading
  firstLoadSetTheme(){
    const theme = localStorage.getItem('theme');
    // First loaded
    if(theme === null){
        localStorage.setItem('theme', 'auto');
        this.setTheme('auto')
    }

    // set theme after other loaded
    if(theme === 'auto'){
        this.setTheme('auto')
    }if(theme === 'dark'){
        this.setTheme('dark')
    }if(theme === 'light'){
        this.setTheme('light')
    }
  }

  // Theme Seter
  setTheme(theme){

    if(theme === 'light'){
        // set theme to local storage
        localStorage.setItem('theme', 'light');
        // set theme on app
        setLight();
    }else if(theme === 'dark'){
        // set theme to local storage
        localStorage.setItem('theme', 'dark');
        // set theme on app
        setDark()
    }else if(theme === 'auto'){
        // set theme to local storage
        localStorage.setItem('theme', 'auto');
        // set theme on app
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(isDark){
            setDark();
        }else{
            setLight();
        }
    }
    changeSwitcherBtn();

    // Set Light theme 
    function setLight(){
        const body = document.querySelector('body');
        body.classList.remove('dark');

    }
    // Set Dark theme 
    function setDark(){
        const body = document.querySelector('body');
        body.classList.add('dark');
    }
    // Change switcher btn icon and active current theme
    function changeSwitcherBtn () {
        const switcherBtn = document.querySelector('#switcher_btn i');
        const themeInputs = document.querySelectorAll('#switcher_menu input[name="theme"]');

        // Active input in switcher select menu
        if(theme === 'auto'){
            themeInputs[2].setAttribute('checked', 'true');
            // check auto theme
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if(isDark){
                switcherBtn.classList = 'icon-night';
            }else{
                switcherBtn.classList = 'icon-sun';
            }
        }else 
        if(theme === 'dark'){
            themeInputs[0].setAttribute('checked', 'true');
            switcherBtn.classList = 'icon-night';
        }else if(theme === 'light'){
            themeInputs[1].setAttribute('checked', 'true');
            switcherBtn.classList = 'icon-sun';
        }
    }
  }

  // Theme Changer
  themeChengerBtn(){
    // Theme chenger Button -------------
    const menu = document.querySelector('#switcher_menu');
    const themeInputs = document.querySelectorAll('#switcher_menu input[name="theme"]');
    
    themeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            this.setTheme(input.value);
            this.closePopups();
        })
    })
    
    // auto change theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemTheme.addEventListener('change', () => {
        const themeFromLocal = localStorage.getItem('theme');
        if(themeFromLocal === 'auto'){
            this.setTheme('auto') 
        }
    })
  }

// Auto close popups 
closePopups(){
    // access to elements for closeing
    const bg = document.querySelector('#hidden_background_section');
    const app = document.querySelector('#app'),
            themeSwitcherMenu = document.querySelector('#switcher_menu');
    
    //  ****** Close Theme Switcher
    if(themeSwitcherMenu.classList.contains('active')){
        app.classList.remove('blur');
        themeSwitcherMenu.classList.remove('active');
        bg.classList.remove('active')
    }

    }
}


export default Theme;