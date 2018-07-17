// initializing moment.js
moment().format();

// putting 0 if the number is less than 10
function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
};

// showing real time
$(document).ready( function() {
    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = checkTime(m);
        //append time to a div on html page
        document.getElementById('time').innerHTML = moment().format("LT");
        t = setTimeout( function() {
            startTime();
        }, 500);
    }
    startTime();
});

// display login info upon click of the button
function loginDisplay() {
    document.getElementById("login_div").style.display = "block";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("signUpBtn").style.display = "none";
    $("#logInBackground").show();
    $("#signUpOrLogin").hide();
    document.getElementById('myDayTrigger').style.display = "none";
}
// display signup info upon click of the button
function signupDisplay() {
    document.getElementById("signup_div").style.display = "block";
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("signUpBtn").style.display = "none";
    document.getElementById("signUpBackground").style.display = "block";
    $("#signUpOrLogin").hide();
    document.getElementById('myDayTrigger').style.display = "none";
}
// sign up functionality
function signUp() {
    firebase.auth().signOut();
    var email = document.getElementById("email_fieldSignUp").value;
    var password = document.getElementById("password_fieldSignUp").value;
    var username = document.getElementById("userName_fieldSignUp").value;

    //greet the user according to time of day
    function updateGreeting() {
        var user = firebase.auth().currentUser;
            var hour = new Date().getHours();
                var greeting;
                if (hour < 12) {
                    greeting = "Good morning,";
                } else if (hour >= 12 && hour <= 17) {
                    greeting = "Good afternoon,";
                } else if (hour > 17 || hour < 5) {
                    greeting = "Good evening,"
                }
                document.getElementById('user_para').innerHTML= greeting + " " + ((user.displayName) ? user.displayName : "");
    };
//create a user in firebase
firebase.auth().createUserWithEmailAndPassword(email, password)
//add a custom username to firebase
    .then(function(user) {
        var database = firebase.database();
        var user = firebase.auth().currentUser;
        function writeUserData(userId, username, email, ) {
            firebase.database().ref('users/' + userId).set({
              username: username,
              email: email,
              userId: user.uid,
            });
          }
    return user.updateProfile({
            displayName: username,
        }).then(function() {
            updateGreeting();
        });
}).catch(function(error) {
    // handle errors here
    var errorMessage = error.message;
    $(".error").append("Error : "+ errorMessage)
    }); 

// control the state of the application and what is visible upon sign in
    firebase.auth().onAuthStateChanged( function(user) {
        if (user) {
            $("#signup_div").hide();
            $("#signUpBackground").hide();
            $("#signUpOrLogin").hide();
            $("#logInBackground").hide();
            $("#time").show();
            $("#weather").show();
            $("#searchBar").show();
            $("#eventsTrigger").show();
            $("#quote").show();
            document.getElementById('myDayTrigger').style.display = "block";
            document.getElementById("user_div").style.display = "block";

            if (user != null) {
                var email_id = user.emailSignUp;
                var name_id = userName_fieldSignUp;

                updateGreeting();
                var hour = new Date().getHours();
                var greeting;
                if (hour < 12) {
                    greeting = "Good morning,";
                } else if (hour >= 12 && hour <= 17) {
                    greeting = "Good afternoon,";
                } else if (hour > 17 || hour < 5) {
                    greeting = "Good evening,"
                }
            document.getElementById('user_para').innerHTML= greeting + " " + ((user.displayName) ? user.displayName : "");
            };
        };
    });
};

// login functionality
function login() {
    firebase.auth().signOut();
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            $(".error").append(errorMessage);
        });

    // control the state of the application and what is visible upon log in
    firebase.auth().onAuthStateChanged( function(user) {
        if (user) {
            document.getElementById("user_div").style.display = "block";
            document.getElementById("login_div").style.display = "none";
            $("#logInBackground").hide();
            $("#time").show();
            $("#weather").show();
            $("#searchBar").show();
            $("#eventsTrigger").show();
            $("#quote").show();
            document.getElementById('myDayTrigger').style.display = "block";

            function displayNotes(notes) {
                $("#todo-list").empty();
                for (var key in notes) {
                    var classes = '';
                    if(notes[key].status === 'completed') classes += ' strike';
                    else if(notes[key].status === 'archived') continue;
                    
                    var note = $(`
                        <li id='toDoListItem' data-uid="${key}">
                            <label class=${classes}>
                                <input 
                                    type='checkbox' 
                                    name='todo-item-done' 
                                    class='filled-in todo-item-done' 
                                    value='${notes[key].text}'
                                    data-uid="${key}" />
                                ${notes[key].text}
                                <button 
                                    class='todo-item-delete waves-effect waves-light btn deleteItemBtn'
                                    data-uid="${key}">
                                        Remove
                                </button>
                            </label>
                        </li>
                    `);
                    $("#todo-list").append(note);
                }
            }

            var database = firebase.database();
            var user = firebase.auth().currentUser;
            var notesRef = database.ref('notes/' + user.uid);
            // notesRef.once('value').then(function(snapshot) {
            //     var notes = snapshot.val();
            //     console.log(notes);
            //     displayNotes(notes);
            
            //  });
             notesRef.on('value', function(snapshot) {
                var notes = snapshot.val();
                console.log(notes);
                displayNotes(notes);
            
             });
            // notesRef.on("child_added", function(childSnapshot, prevChildKey) {
            //     var text = childSnapshot.val().text;
            //     var key = childSnapshot.key;
            //     console.log(text);
            //     $("#todo-list").append(`
            //         <li id='toDoListItem'>
            //             <label>
            //                 <input 
            //                     type='checkbox' 
            //                     name='todo-item-done' 
            //                     class='filled-in todo-item-done' 
            //                     value='${text}'
            //                     data-uid="${key}" />
            //                 ${text}
            //                 <button 
            //                     class='todo-item-delete waves-effect waves-light btn deleteItemBtn'>
            //                         Remove
            //                 </button>
            //             </label>
            //         </li>
            //     `);
            // });


            if (user != null) {
                var email_id = user.email;
                var hour = new Date().getHours();
                // need condition for the wee hours of the morning
                var greeting;
                if (hour < 12) {
                    greeting = "Good morning,";
                } else if (hour >= 12 && hour <= 17) {
                    greeting = "Good afternoon,";
                } else if (hour > 17 || hour < 5) {
                    greeting = "Good evening,"
                }
                    document.getElementById('user_para').innerHTML=greeting + " " + ((user.displayName) ? user.displayName : "") ;
            };
        }; 
    }); // closing firebase auth
}; // closing login function

// logout functionality
function logout() {
    firebase.auth().signOut();
    function StopDisplayingNotes() {
        var user = firebase.auth().currentUser;
        var notesRef = firebase.database().ref('notes/' + user.uid);

        notesRef.once('value').then(function(snapshot) {
            var notes = "";
            console.log(notes);
  });
    };
    StopDisplayingNotes();
    
    document.getElementById("email_field").value='';
    document.getElementById("password_field").value='';
    document.getElementById("login_div").style.display = "none";
    $("#signUpBackground").hide();
    $("#signUpOrLogin").show();
    $("#logInBackground").hide();
    $("#loginBtn").show();
    $("#signUpBtn").show();
    $("#user_div").hide();
    $("#time").hide();
    $("#weather").hide();
    $("#searchBar").hide();
    $("#eventsTrigger").hide();
    $("#quote").hide();
    $("#myDayTrigger").hide();
}; // closing logout function

$(document).ready( function() {
    // hide all My Day features on default (not signed in)
    $("#time").hide();
    $("#weather").hide();
    $("#searchBar").hide();
    $("#eventsTrigger").hide();
    $("#quote").hide();
    document.getElementById('myDayTrigger').style.display = "none";
}); // closing ready function


// news API functionality
$(document).ready(function(){
    $('.modal').modal();
    });

    var $news = $('#news');
    var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=2cbc0b4812554558a06c7e9c28d05b49';
    var req = new Request(url);
    fetch(req)
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(response => {

            if (response.articles.length) {
                var newsList = `<ul class='newsList'>`;
                for (var i = 0; i < response.articles.length; i++) {
                    // if (response.articles.length) {
                         // limiting news list to 10
                         response.articles.length = 10;
                         var article = response.articles[i];
    
                         var datePublished = moment(article.publishedAt).format("llll");
    
                         newsList += `<li><div class="col s12 m6">
                            <div class="card sticky-action style="overflow:visible;">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="`+ article.urlToImage +`">
                                <span class="card-title"></span>
                            </div>
                            <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">`+article.title+`<i class="material-icons right">more_vert</i></span>
                                <p><a class="eventAddress" target="_blank" href="#">`+article.author+`</a></p>
                            </div>
                            <div class="card-action">
                                <p>Date: `+ datePublished +`</p>
                                <a id="eventLink" target="_blank" href="`+article.url+`">Read Article <i class="material-icons md-16">open_in_new</i></a>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">`+article.title+`<i class="material-icons right">close</i></span>
                                <p>`+article.description+`</p>
                            </div>
                            </div>
                        </div></li>`;   
        
                } // closing for loop
                newsList += `</ul>`;
                $news.html(newsList);
            } // closing if statement
        }); // closing then function

