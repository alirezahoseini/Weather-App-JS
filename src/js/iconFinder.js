class IconFinder{
    async findIcon(weather){
        // Access to time
        let currentHour = weather.dt_txt;
        currentHour = currentHour.split(' ')
        const time = currentHour[1].slice(0, 2);

        let currentStatus = '';

        // Gain status
        if(time >= '06' && time <= '19' ){
            currentStatus = 'day'
        }else {
            currentStatus = 'night'
        }

        // Create icon link
        let icon = weather.weather[0].main;
        icon = icon.toLowerCase()
        icon = `./src/assets/images/weather/${icon}_${currentStatus}.webp`;

        return icon;
    }
}

export default IconFinder;