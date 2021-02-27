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




//.ON replaces addEvent Listener in this case and brings
//the click functionality for the search button
searchbtn.on("click" , function(event) {
    event.preventDefault();
//grab value from input (what the users typed)
        const searchCity = $("#search-input").val();
        if (searchCity=== "") {
            alert("Please enter a town or City in the search bar")
        }else{

        console.log(cityArr)
            //call function to make ajax call
            //pass argument searchCity

            //check to make sure we dont save the same city twice
            console.log(cityArr.indexOf(searchCity))
            console.log(cityArr)
           if(cityArr.indexOf(searchCity) === -1){
               cityArr.push(searchCity);
               localStorage.setItem("cityHistory", JSON.stringify(cityArr))
               makeList(searchCity)
           }
    $("#search-input").val("")
           
            getCurrentWeather(searchCity);
            GetfiveDayForecast(searchCity);
        }
});

//Variable created here for the clear button and jquery was used
let clear = $("#clear");
//$(this).val("");
//Clear button clears the information from the search
clear.on("click" , function(event) {
    event.preventDefault();
  localStorage.clear();
  $("#cityList").empty();
   
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
            console.log(res.coord);
            //Lat & lon variables created here for passing into the UV Index Function 
        //which is down below.
        var lat = res.coord.lat;
        var lon = res.coord.lon;

        getUVIndex(lat, lon)


   
   

    //clear previous content
        
        
        $(".currentWeather").empty();

    
    
    
   

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
console.log(card)
            card.append(cityName, wind, humidity , temperature, img)
            $(".currentWeather").append(card)
        


    //call next ajaxs
    //      - to get forecast
    //      - to get uv index

        })
};




//5 Day forecast API Ajax Call. 

function GetfiveDayForecast(city){
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKEY + "&units=imperial",
    }).then(function(data) { 
        
       console.log(data.city.coord);
        $("#fiveDay").empty();
        for (let i = 0; i < data.list.length; i++) {
           // console.log(data.list[i]
            if(data.list[i].dt_txt.indexOf("15:00:00") !== -1){
                    console.log(data.list[i])
                var card = $("<div>").addClass("col card");
                var date = $("<h4>").text(new Date (data.list[i].dt_txt).toLocaleDateString());
                var temp =$("<p>").text("Temperature: " + data.list[i].main.temp_max);
                var humid = $("<p>").text("Humidity: " + data.list[i].main.humidity);
                
console.log(new Date (data.list[i].dt_txt))
                card.append(date, temp, humid)
                $("#fiveDay").append(card)
            }
            
        }
    })  
}
//This makes the city list clickable
function makeList(city){
    var item = $("<li>").text(city)
    item.click(function(){
        //console.log($(this).text())
        getCurrentWeather($(this).text())
        GetfiveDayForecast($(this).text())
    })
    $("#cityList").append(item)
}

 

var cityArr = JSON.parse(localStorage.getItem("cityHistory")) || [];


//Here if cityArr length is more than 0, then we call the fucntion to display the City searches

if(cityArr.length > 0){
    console.log("ARRAY", cityArr)
for (let i = 0; i < cityArr.length; i++) {
    console.log(cityArr[i])
    makeList(cityArr[i])
}

}

//Function for getting the UV Index and the AJAX Call to do so
function getUVIndex(lat,lon) {
    console.log(lat,lon);
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKEY+"&lat=" + lat + "&lon=" + lon, 
        dataType:"JSON"
    }).then(res=>{
        console.log(res)
        var uvIndex = $("<p>").text("UN Index" + res.value);
    });
    

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





