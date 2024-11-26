
const weatherForm = document.querySelector('.wheather-container');
const input = document.querySelector('.input2');
const button2 = document.querySelector('.button2');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity-condition');
const skyCondtion = document.querySelector('.sky-condition');
const string = '2c0e4ecf0330e91e336121de4360f29b';
const errorText = document.querySelector('.error-display');


button2.addEventListener('click',async(event)=>{
    const name = input.value;
     fetchData(name);

})


/* When click the Enter fetch the data */
window.addEventListener('keydown',(event) => {
    if(event.key === "Enter"){
        const name = input.value;
        fetchData(name);
    }
})
const fetchData = async(name) => {
    if (name) {
        try {
            
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${string}`; 
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error("could not fetch the data ! try again");
            }
    
            const data = await response.json();
            displayInfo(data);
            
            
        } catch (error) {
            display_Error("something went wrong try again");
        }
    } else {
        display_Error("Please Enter the city !")
    }
}
const display_Error = (param) => {
    weatherForm.innerHTML = "";
    weatherForm.style.display = "block";
    errorText.innerHTML = param;
    weatherForm.appendChild(errorText);
}

function displayInfo(data) {
    const{name,main:{temp,humidity},weather:[{description,id}],wind:{speed}} = data;
    const imoji = getWeitherEmoji(id);
    let html = `

            <div class="wheather-container" style="display: block;">
                <h1 class="city">${name}</h1>
                <img src="${imoji}" class="weatherImage"></img>
            
                <h1 class="temp">${(temp-273.15).toFixed(2)}°C</h1>
                <p class="sky-condition">${description}</p>
                <div class="humidity-container">
                    <div class="humidity-text">
                        <div><i class="fa-solid fa-cloud"></i></div>
                        <div style="text-align: start;">
                            <p class="humidity-condition">${humidity}%</p>
                            <p style="margin: 0;font-size: 11px; font-weight: bold;">Humidity</p>
                        </div> 
                    </div>
                    <div class="wind-speed">
                        <div><i class="fa-solid fa-wind"></i></div>
                        <div style="text-align: start;">              
                            <p class="wind-condition">${speed}km/h</p>
                            <p style="margin: 0;font-size: 11px;font-weight: bold;">Wind speed</p>
                        </div> 
                    </div>
                </div>
            </div>

    `;
    weatherForm.innerHTML = html;
    weatherForm.style.display = "block";

    input.value = "";   // to clear the text inside the input
}
const getWeitherEmoji = (weitherId) => {
    let image;
    switch (true) {
        case weitherId >= 200 && weitherId <300:
            image = "thunderson.png";
            break;
        case weitherId >= 300 && weitherId <400:
        image =  "drizzle.webp";
            break;
        case weitherId >= 500 && weitherId<600:
            image =  "rain.webp";
            break;
        case weitherId >= 600 && weitherId<700:
            image =  "snow.webp";
            break;
        case weitherId >= 700 && weitherId<800:
            image =  "fog.png";
            break;
        case weitherId === 800:
            image =  "sun.png";
            break;
        case weitherId > 800 && weitherId <810:
            image =  "cloud.webp";
            break;
        default:
        image = "sun.png"
    }
    return image;
}
