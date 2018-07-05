$(document).ready( function(){
    // google searchbar
    (function () {
        var cx = '014280645296093928214:imfnxx30oyo';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
    })();

    // weather modal
    $('.modal').modal();

    // show real time
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        // add a zero in front of numbers<10
        m = checkTime(m);
        document.getElementById('time').innerHTML = h + ":" + m;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();

    // generate random quote
    // hold the link to the API endpoint
    var forismaticAPI = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

    $('#gsc-i-id1').removeAttr('placeholder');
        // generate random quote
        // grab element by ID quote
        // append quote inside the div
        $.getJSON(forismaticAPI, function (data) {
            $("#quote").append('<blockquote>' + data.quoteText + '</blockquote>' + '<p id="author"> —  ' + data.quoteAuthor + '</p>')
        });

        // get geolocation for weather
        var geoLocationAPI = "http://api.ipstack.com/170.140.105.75?access_key=0feabad0b36ed7c5509ef1acc3df509c"
        $.getJSON(geoLocationAPI, function (data) {
            $("#language").append(data.location.country_flag_emoji + "<br>" + data.location.languages[0].name)
            $("#weather").append(data.zip + "<br>" + data.city + " " + data.region_name)
            var lat = data.latitude;
            var long = data.longitude;
            console.log(lat, long)

            var proxy = 'https://cryptic-headland-94862.herokuapp.com/';
            var darkSkyAPI = `https://api.darksky.net/forecast/8731619e7a890afa3e28099bc6d36035/${lat},${long}`;

            // dark sky weather API call
            $.ajax({
                url: proxy + darkSkyAPI,
                success: function (res) {
                    console.log(res);

                    console.log(res.daily.data[1].time)
                    var convertedDate1 = new Date(res.daily.data[1].time * 1000);
                    var convertedDate2 = new Date(res.daily.data[2].time * 1000);
                    var convertedDate3 = new Date(res.daily.data[3].time * 1000);
                    var convertedDate4 = new Date(res.daily.data[4].time * 1000);
                    var convertedDate5 = new Date(res.daily.data[5].time * 1000);

                    var dayOfWeek1 = convertedDate1.getDay();
                    var dayOfWeek2 = convertedDate2.getDay();
                    var dayOfWeek3 = convertedDate3.getDay();
                    var dayOfWeek4 = convertedDate4.getDay();
                    var dayOfWeek5 = convertedDate5.getDay();

                    // forecast
                    var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat")
                    $("#day1").append(weekday[dayOfWeek1] + "<br>" + (Math.round((res.daily.data[1].temperatureHigh + res.daily.data[1].temperatureLow) / 2) * 100) / 100);
                    $("#day2").append(weekday[dayOfWeek2] + "<br>" + (Math.round((res.daily.data[2].temperatureHigh + res.daily.data[2].temperatureLow) / 2) * 100) / 100);
                    $("#day3").append(weekday[dayOfWeek3] + "<br>" + (Math.round((res.daily.data[3].temperatureHigh + res.daily.data[3].temperatureLow) / 2) * 100) / 100);
                    $("#day4").append(weekday[dayOfWeek4] + "<br>" + (Math.round((res.daily.data[4].temperatureHigh + res.daily.data[4].temperatureLow) / 2) * 100) / 100);
                    $("#day5").append(weekday[dayOfWeek5] + "<br>" + (Math.round((res.daily.data[5].temperatureHigh + res.daily.data[5].temperatureLow) / 2) * 100) / 100);

                    // animated weather icons
                    $("#weatherIcon").append("You are in " + data.zip + "<br>" + "Current temperature is " + res.currently.temperature + '<br>' + "It is " + res.currently.summary + "<br>" + "It feels like " + res.currently.apparentTemperature + "<br>");
                    //add to skyicons the weather information
                    var skycons = new Skycons({
                        "color": "#a0c7db",
                    });

                    skycons.add(document.getElementById("icon"), res.currently.icon);
                    skycons.add(document.getElementById("icon2"), res.currently.icon);
                    skycons.add(document.getElementById("icon3"), res.daily.data[1].icon);
                    skycons.add(document.getElementById("icon4"), res.daily.data[2].icon);
                    skycons.add(document.getElementById("icon5"), res.daily.data[3].icon);
                    skycons.add(document.getElementById("icon6"), res.daily.data[4].icon);
                    skycons.add(document.getElementById("icon7"), res.daily.data[5].icon);
                    
                    //start animation for weather icons
                    skycons.play();
                }
            });
        });

}); // closing ready function