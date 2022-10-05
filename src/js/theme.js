class Theme {
   // Set app theme affter loading
  firstLoadSetTheme(){
    const theme = localStorage.getItem('theme');
    // First loaded
    if(theme === null){
        localStorage.setItem('theme', 'auto');
        this.setTheme('auto')
    }

    // 
    if(theme === 'auto'){
        this.setTheme('auto')
    }

  }
  // Theme Seter
  setTheme(theme){
    if(theme === 'light'){
        setLight()
    }else if(theme === 'dark'){
        setDark()
    }else if(theme === 'auto'){
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if(isDark){
            setDark()
            console.log('dark auto');
        }else{
            setLight()
            console.log('light auto')
        }
    }

    // Set Light theme 
    function setLight(){
        const body = document.querySelector('body');
        body.classList.remove('dark')
    }
    // Set Dark theme 
    function setDark(){
        const body = document.querySelector('body');
        body.classList.add('dark')
    }
  }
  // Theme Changer
//   themeChenger(){
    
//     const switcherBtn = document.querySelector('#desktop--dark_switcher label');
    


//     // if(isDark){
//     //   switcherBtn.classList.add("right-0")
//     //   switcherBtn.classList.remove("left-0")
//     //   isDark = false;
//     // }else{
//     //   switcherBtn.classList.remove("right-0")
//     //   switcherBtn.classList.add("left-0")
//     //   isDark = true;
//     // }
//   }
}


export default Theme;