class Theme {
   // Set app theme affter loading
  firstLoadSetTheme(){
    this.themeChengerBtn();
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
            setDark()
        }else{
            setLight()
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
        const switcherBtn = document.querySelector('#switcher_btn');
        const menuOptions = document.querySelectorAll('#switcher_menu li');
        // remove active on switcher menu btns
        menuOptions.forEach((option) => option.classList.remove('active'));

        if(theme === 'auto'){
            menuOptions[2].classList.add('active');
            switcherBtn.classList = 'icon-settings-2 cursor-pointer transition duration-200 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 rounded-lg text-md '
        }else if(theme === 'dark'){
            menuOptions[0].classList.add('active');
            switcherBtn.classList = 'icon-night cursor-pointer transition duration-200 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 rounded-lg text-md '
        }else if(theme === 'light'){
            menuOptions[1].classList.add('active');
            switcherBtn.classList = 'icon-sun cursor-pointer transition duration-200 p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-200 rounded-lg text-md '
        }
    }
  }

  // Theme Changer
  themeChengerBtn(){
    // Theme chenger Button -------------
    const menu = document.querySelector('#switcher_menu');
    const menuButtons = document.querySelectorAll('#switcher_menu li');
    // set click event on buttons
    menuButtons.forEach( (button) => {
        button.addEventListener('click', () => {
            // remove active class
            const currentTheme = button.getAttribute('data-theme-value')
            menuButtons.forEach((btn) => btn.classList.remove('active'));
            menu.classList.remove('active');
            // set theme
            this.setTheme(currentTheme);
        });
    });

    // auto change theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemTheme.addEventListener('change', () => {
        const themeFromLocal = localStorage.getItem('theme');
        if(themeFromLocal === 'auto'){
            this.setTheme('auto') 
        }
    })
  }
}


export default Theme;