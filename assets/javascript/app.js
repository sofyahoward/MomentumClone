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
            startTime();
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

            // grabbing list of local events from eventbrite
            // this seems to break when there's no image for an event
            var token = '6A7TOLR2YF2M2YFHJDWA';
            var $events = $("#events");
            
            $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&expand=venue'+'&sort_by=date&location.latitude='+lat+'&location.longitude='+long+'' , function(res) {
                console.log(res);
                if (res.events.length) {
                    var eventList = `<ul class='eventList'>`;
                    for (var i = 0; i < res.events.length; i++) {
                        // limiting event list to 5
                        res.events.length = 5;
                        var event = res.events[i];
                        console.dir(event);

                        eventList += `<li><div class="col s12 m6">
                        <div class="card sticky-action style="overflow:visible;">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="`+ event.logo.url +`">
                            <span class="card-title"></span>
                        </div>
                        <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">`+event.name.text+`<i class="material-icons right">more_vert</i></span>
                            <p><a target="_blank" href="#">`+event.venue.address.localized_address_display+`</a></p>
                        </div>
                        <div class="card-action">
                            <p>`+event.start.local+ " to " +event.end.local+`</p>
                            <a target="_blank" href="`+event.url+`">Register [icon here]</a>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">`+event.name.text+`<i class="material-icons right">close</i></span>
                            <p>`+event.description.text+`</p>
                        </div>
                        </div>
                    </div></li>`;

                    // if (event.logo.url === null) {
                    //     $('.activator').attr('src', 'https://logoeps.com/wp-content/uploads/2012/10/eventbrite-logo-vector.png');
                    // }

                    // the event times need to be converted to an unstandable format

                    }
                    eventList += `</ul>`;
                    $events.html(eventList);

                } else {
                    $events.html("<p>Sorry, there are no upcoming events in your area.</p>");
                }

                var eventLat = event.venue.latitude;
                    console.log(eventLat);
                var eventLong = event.venue.longitude;
                    console.log(eventLong);

            });

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



        
		
       
            
            
    



    // changing google searchbar placeholder text
    // this is not working :(
    $('#gsc-i-id1').placeholder = 'Search Google';

}); // closing ready function