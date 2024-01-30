$(document).ready(function() {
    
    displayButtons();                                                                                                                               

    // Function to display the weather today based on the city the user searches for.
    function displayWeatherToday () {

        var cityInput = $("#search-input").val().trim();                                                                                             
        var apiKey = "379f54c3553fa3935a559271241c0049";                                                                                           

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&mode=json&units=metric&appid=" + apiKey;                

        fetch(queryURL)                                                                                                                             
        .then(function (response) {                                                                                                             
            return response.json();                                                                                                                 
        })
        .then(function (data) {                                                                                                                     
            $("#today").empty();                                                                                                                 
            var cityInput = (data.name);                                                                                                        
            var forecastDate = dayjs.unix(data.dt).format("DD-MM-YYYY");                                                                            
            var forecastIcon = (data.weather[0].icon);                                                                                         
            var forcastIconLink = ("https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");                                                
            var forecastTemp = (data.main.temp.toFixed(1));                                                                                       
            var forecastWind = (data.wind.speed.toFixed(0));                                                                                      
            var forecastHumidity = (data.main.humidity);                                                                                            

            var todaysForecastDiv = $("<div>");                                                                                                    
            todaysForecastDiv.css({"border":"solid black 1px"});                                                                                    

            // City Name
            var todaysForecastCity = $("<h2>");                                                                                                    
            todaysForecastCity.text(cityInput);                                                                                                      
            todaysForecastDiv.append(todaysForecastCity);                                                                                        

            // Today's Date
            var todaysDate = $("<p>");                                                                                                         
            todaysDate.text("(" + forecastDate + ")");                                                                                              
            todaysForecastDiv.append(todaysDate);                                                                                                 

            // Weather Forecast Icon
            var todaysForecastIcon = $(`<img src="${forcastIconLink}">`);                                                                         
            todaysForecastDiv.append(todaysForecastIcon);                                                                                         

            // Temperature Forecast
            var todaysForecastTemp = $("<p>");                                                                                                    
            todaysForecastTemp.text("Temp: " + forecastTemp + " °C");                                                                             
            todaysForecastDiv.append(todaysForecastTemp);                                                                                        

            // Wind Forecast
            var todaysForecastWind = $("<p>");                                                                                                    
            todaysForecastWind.text("Wind: " + forecastWind + "/mph");                                                                              
            todaysForecastDiv.append(todaysForecastWind);                                                                                         

            // Humidity Forecast
            var todaysForecastHumidity = $("<p>");                                                                                                
            todaysForecastHumidity.text("Humidity: " + forecastHumidity + "%");                                                                 
            todaysForecastDiv.append(todaysForecastHumidity);                                                                                     

            $("#today").append(todaysForecastDiv);                                                                                              
        });

    }

    function displayForecast() {
    const forecastCityName = document.getElementById("search-input").value.trim();
    const apiKey = "379f54c3553fa3935a559271241c0049";
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${forecastCityName}&mode=json&units=metric&appid=${apiKey}`;

    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
        data.list.forEach((item) => {
            if (item.dt_txt.includes("00:00:00")) {
            console.log(item);
            const eachDate = dayjs.unix(item.dt).format("DD-MM-YYYY");
            console.log(eachDate);
            const eachIcon = item.weather[0].icon;
            console.log(eachIcon);
            const eachIconLink = `https://openweathermap.org/img/wn/${eachIcon}@2x.png`;
            console.log(eachIconLink);
            const eachTemp = item.main.temp.toFixed(1);
            console.log(eachTemp);
            const eachWind = item.wind.speed.toFixed(0);
            console.log(eachWind);
            const eachHumidity = item.main.humidity;
            console.log(eachHumidity);

            const multiDayForecastGrid = $("<div>").addClass("col-sm-12 col-md-12 col-lg-2");
            const multiDayForecastCard = $("<div>").addClass("card");
            multiDayForecastGrid.append(multiDayForecastCard);
            const multiDayForecastCardBody = $("<div>").addClass("card-body").css({ "text-align": "center", "background-color": "gray" });
            multiDayForecastCard.append(multiDayForecastCardBody);
            const multiDayForecastCardTitle = $("<h5>").addClass("card-title").text(`(${eachDate})`);
            multiDayForecastCardBody.append(multiDayForecastCardTitle);
            const multiDayForecastCardIcon = $(`<img src="${eachIconLink}">`).css({ "height": "75px", "width": "75px" });
            multiDayForecastCardBody.append(multiDayForecastCardIcon);
            const multiDayForecastCardTemp = $("<p>").text(`Temp: ${eachTemp} °C`);
            multiDayForecastCardBody.append(multiDayForecastCardTemp);
            const multiDayForecastCardWind = $("<p>").text(`Wind: ${eachWind} mph`);
            multiDayForecastCardBody.append(multiDayForecastCardWind);
            const multiDayForecastCardHumidity = $("<p>").text(`Humidity: ${eachHumidity}%`);
            multiDayForecastCardBody.append(multiDayForecastCardHumidity);

            $("#forecast").append(multiDayForecastGrid);
            }
        });
        });
    }

    // Function to save city names to localstorage.
    function saveCity() {
        var newCityName = $("#search-input").val().trim();                                                                                        
        var existingCities = JSON.parse(localStorage.getItem("savedCities"));                                                                      

        if (newCityName !== "") {                                                                                                                 
            var cityText = newCityName;                                                                                                         
            var cityObject = {cityText};                                                                                                            
        } else {                                                                                                                             
            alert("Please enter a city before searching!");                                                                                     
            return;
        };

        if (!existingCities) {                                                                                                                  
            existingCities = [];                                                                                                                
        };

        var newCities = [...existingCities, cityObject];                                                                                         
        localStorage.setItem("savedCities", JSON.stringify(newCities));                                                                            
    }

    // Function to display previously searched cities from local storage as buttons.
    function displayButtons () {
        var existingCities = JSON.parse(localStorage.getItem("savedCities"));                                                                   
        
        if (existingCities !== null) {                                                                                                          
            $("#history").empty();                                                                                                                
            for (var i = 0; i < existingCities.length; i++) {                                                                                       
                var searchHistoryButton = $("<button>");                                                                                        
                searchHistoryButton.addClass("btn btn-secondary col-12 mt-2 previous-search");                                                    
                searchHistoryButton.text(existingCities[i].cityText);                                                                            
                $("#history").append(searchHistoryButton);                                                                                        
            }; 
        } else {                                                                                                                                
            return;
        };    
    }

    // Function to handle events when search button is clicked.
    $("#search-button").on("click", function (event) {
        event.preventDefault();                                                                                                                     
        var newCityName = $("#search-input").val().trim();                                                                                          
        if (newCityName !== "") {                                                                                                                   
            displayWeatherToday();                                                                                                                 
            $("#forecast").empty();                                                                                                                 
            $("#forecast").css({"display":"flex", "justify-content":"space-between"});                                                           
            var forecastH4 = $("<h4>");                                                                                                            
            forecastH4.text("5-Day Forecast");                                                                                                  
            $("#forecast").append(forecastH4);                                                                                                   
            displayForecast();                                                                                                                   
            saveCity();                                                                                                                       
            displayButtons();                                                                                                                   
        } else {                                                                                                                                
            alert("Please enter a city before searching!");                                                                                   
            return;
        }
    });

    $(".previous-search").on("click", function (event) {
        event.preventDefault();
        var cityName = $(this).text();    
        var forecastCityName = $(this).text(); 
        $("#today").empty();
        $("#forecast").empty();
        console.log(cityName)
        console.log(forecastCityName)
    })
});