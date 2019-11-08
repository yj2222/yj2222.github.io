const API_KEY = '95a0ca26d002f09d2a110a24c49433e1';

$(function(){
    $('.tab_btn').on('click', function() {
        $('.tab_item').removeClass("is-active-item");
        $($(this).attr("href")).addClass("is-active-item");
        $('.tab_btn').removeClass('is-active-btn');
        $(this).addClass('is-active-btn');
        var cityName = $(this).text()
        // console.log(cityName);
        var addPoint = $($(this).attr("href")).children("#weather__result")
        // console.log(addPoint)
        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?APPID=' + API_KEY + '&q=' + cityName;
        // console.log(requestUrl);
        $.ajax(requestUrl)
            .done(function(data) {
                // console.log(data)
                if (data.cod == 200) {
                    var weather = data.list[0].weather[0].main;
                    if (weather == "Clear"){
                        weather = "晴れ"
                    }
                    if (weather == "Clouds"){
                        weather = "曇り"
                    }
                    if (weather == "Rain"){
                        weather = "雨"
                    }
                    // console.log(weather)
                    var temp = (data.list[0].main.temp - 273).toFixed(1);
                    // console.log(temp)
                    var newHtml = buildToResultHtml(temp, weather)
                    function buildToResultHtml(temp, weather) {
                        var html = 
                            `<div class="weather__result--text">
                                <p>現在の気温：</p>
                                <p>${temp}</p>
                            </div>
                            <div class="weather__result--text">
                                <p>現在の天気：</p>
                                <p>${weather}</p>
                            </div>`
                        return html;
                    }
                    addPoint.empty();
                    addPoint.append(newHtml);
                }
            });
    });

});

