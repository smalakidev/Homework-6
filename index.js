//Require tells the file that there's a special library and 
//we will import it 
// const moment = require("moment");
//Setting a current date for the webpage. I grabbed my HTML with $
// let currentDate = $(".Date").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
//Document.ready makes sure that our HTML runs on JavaScript
// $(document).ready(function()  {



var APIKEY ="7340c61d1124828c3bc01eb7d3fb07cb"
//jquery is used to grab the search button 
let searchbtn = $("#search-btn");

 //store city in local storage if not there already
//This function saves the city to local storage.

// function saveCurrentCity() {

//     localStorage.setItem("SaveCurrentCity", JSON.stringify(searchCity) { }
// }


//.ON replaces addEvent Listener in this case and brings
//the click functionality for the search button
searchbtn.on("click" , function(event) {
    event.preventDefault();
//grab value from input (what the users typed)
        const searchCity = $("#search-input").val();
        if (searchCity=== "") {
            alert("Please enter a town or City in the search bar")
        }else{

        console.log(searchCity)
            //call function to make ajax call
            //pass argument searchCity
            getCurrentWeather(searchCity);
            GetfiveDayForecast(searchCity);
        }
});


//declares argument to get the current weather.
function getCurrentWeather(city){
        console.log(city)
    //ajax call
    $.ajax({
        type: "GET",
        url:"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKEY + "&units=imperial"
    })
        .then((res)=>{
            console.log(res)
    


   
   

    //clear previous content

    //create html for current weather
           //car. Here we are  literally creating HTML Content with JavaScript
           var card = $("<div>").addClass("currentCard");
        //city name
            var cityName = $("<h2>").text(city);
            //wind
            var wind = $("<h3>").text("WIND " + res.wind.speed + " MPH" );
            //huminidty
            var humidity = $("<h3>").text("Humidity " +res.main.humidity + "%");
            //temperature
            var temperature = $("<h3>").text("temperature " + res.main.temp + "F");
            var img = $("<h3>").attr({
                src:
                  "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png",
                height: "100px",
                width: "100px",
              });
            //img

            card.append(cityName, wind, humidity , temperature, img)
            $(".currentWeather").append(card)
        


    //call next ajaxs
    //      - to get forecast
    //      - to get uv index

        })
};




//5 Day forecast API Ajax Call

function GetfiveDayForecast(city){
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKEY + "&units=imperial",
    }).then(function(data) { 
      //  console.log(data);

        for (let i = 0; i < data.list.length; i++) {
           // console.log(data.list[i]
            if(data.list[i].dt_txt.indexOf("15:00:00") !== -1){
                    console.log(data.list[i])
                var card = $("<div>").addClass("col card");
                var date = $("<h4>").text(new Date (data.list[i].dt_txt).toLocaleDateString());
                var temp =$("<p>").text("Temperature: " + data.list[i].main.temp_max);
                var humid = $("<p>").text("Humidity: " + data.list[i].main.humidity);
                var uv
console.log(new Date (data.list[i].dt_txt))
                card.append(date, temp, humid)
                $("#fiveDay").append(card)
            }
            
        }
    })  
}


 










// function.localStorage()

//Get from local storage
//submit to local storage
//Get Weather API
//Current date and time with Moment.js



// enter city name in input
//hit search btn 
// on click event, which trigers a function
//      grab value from input, store it into a var
//      pass that var as an argument to a funciton;



