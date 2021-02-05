$(document).ready(function()  {

//jquery used here to grab #search-input
let searchCity = $("#search-input");

//.ON replaces addEvent Listener in this case and brings
//the click functionality 
searchCity.on("click" , function(event) {
console.log(event);
};

//Current date and time with Moment.js
moment().format('MMMM Do YYYY, h:mm:ss a');

const searchCity = $("#search-input").val();
// enter city name in input
//hit search btn 
// on click event, which trigers a function
//      grab value from input, store it into a var
//      pass that var as an argument to a funciton;







} );

