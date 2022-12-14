window.addEventListener('load', () => {
    let long;
    let lat;

    //Query Selectors
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span');

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
                //Set Celsius Formla
                let celsius = (temperature - 32) * (5/9);
                //Set Icons
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
        });

    }else{
        h1.texContent = "Location is not enabled | Location is required!";
    }



    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});