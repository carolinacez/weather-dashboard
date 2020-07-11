// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c8c5256ce849050cb1979747a81a6753
// var currentDay = document.getElementById("toDay");
// currentDay.innerHTML = moment().format('MM/DD/YYYY');
function displayTime() {
    var time = moment().format("MMMM Do YYYY")
    $("#toDay").html(time);
    
};


function searchWeather() {
    event.preventDefault()
    let searchCity = $("#city").val() 

    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ searchCity +
    "&APPID=c8c5256ce849050cb1979747a81a6753&units=imperial"
    
    $.ajax({
        url: queryUrl , 
        type: "GET"
    })
    .then(function(response){

        $("#weather").empty();
        // console.log(response)
        // console.log(response.name)
        // console.log("wind speed" , response.wind.speed)
        // console.log("temperature" , convertKelvin(response.main.temp))
        
        let titleName = $("<h2>").text(response.name);

        let icon = $("<img>").attr("src" , "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

        let currentTemp = $("<p>").text(" Temp : " + response.main.temp)
        

        let windSpeed = $("<p>").text(" Wind Speed : " + response.wind.speed);

        
        let humidity = $("<p>").text(" Humidity : " + response.main.humidity);
        
        // let weather = $("#weather").addClass("weather")
        
        // weather.append(titleName , icon , currentTemp , humidity , windSpeed)
      
        let card = $("<div>").addClass("card col-5 styling"); 
        let cardBody = $("<div>").addClass("card-body").attr("id" , "indexUv"); 
       
        card.append(cardBody)
        
        
        cardBody.append(titleName , icon , currentTemp , humidity , windSpeed)
        $("#weather").append(card);

        // let cardA = $("<div>").addClass("card col-4")
        // let cardBodyA = $("div").addClass("card-body")
        // cardA.append(cardBodyA)
        // $("#names").append(cardA)

        let title = $("<h4>").text(response.name)
        let nameEl = $("#names")
        nameEl.append(title)


        // boxStyle.append(boxStyleMain);
        // boxStyleMain.append(humidity);
        let latitudeEl = response.coord.lat
        let longitudeEl = response.coord.lat
        secondApi(latitudeEl , longitudeEl);
        
        
    })

}

function secondApi(latitudeEl , longitudeEl){
    
    let fiveDayApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitudeEl + 
    "&lon=" + longitudeEl + "&exclude=minutely,hourly&appid=c8c5256ce849050cb1979747a81a6753&units=imperial";
    
    $.ajax({
        url: fiveDayApi , 
        type: "GET"
    })
    .then(function(response){
        console.log(response);
        $("#days").empty(); 
        
        for (let i = 0; i < response.daily.length; i++) {
            if(response.daily[i]){
                let icon = $("<img>").attr("src" , "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png")

                let currentTemp = $("<p>").text(" Temp : " + response.daily[i].temp.day) 

                let humidity = $("<p>").text(" Humidity : " + response.daily[i].humidity);
                
                let dailyDate =$("<p>").html(response.daily[i].dt);
                let time = moment().format("DD-MM-YYYY");
                
                
                let card = $("<div>").addClass("card col-5 second"); 
                let cardBody = $("<div>").addClass("card-body"); 
               
                card.append(cardBody);
                $("#days").append(card);
                
                cardBody.append(time, icon, currentTemp, humidity);
                
                 
               
                

            }

            
        }
        let index =$("<p>").text(" UVI :" + response.current.uvi);
                $("#indexUv").append(index);
        
    })

}


$("#search").on("click" , function(){
    searchWeather();
    
})
displayTime();

// var s = new Date(reponse.daily[i].dt).toLocaleDateString("en-US")
// console.log(s)




// function convertKelvin(temp) {
//     return parseInt(((((temp)-273.15)* 1.8) + 32))
// }
