window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set Dom Element from API
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                temperatureDescription.textContent = summary;
                //Set Icons
                setIcons(icon, document.querySelector(".icon"));
            })
        });

    }else{
        h1.texContent = "Location is not enabled for accurate location";
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});