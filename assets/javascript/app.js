function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime() {
var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
// add a zero in front of numbers<10
m = checkTime(m);
return { hour: h, minute: m };
}

console.log(getTime());

$(document).ready( function() {

    // show real time
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
}); // closing ready function

// display login info upon click of the button
function loginDisplay(){
document.getElementById("login_div").style.display = "block";
document.getElementById("loginBtn").style.display = "none";
document.getElementById("signUpBtn").style.display = "none";
$("#logInBackground").show();
$("#signUpOrLogin").hide();
}
// display signup info upon click of the button
function signupDisplay(){
document.getElementById("signup_div").style.display = "block";
document.getElementById("loginBtn").style.display = "none";
document.getElementById("signUpBtn").style.display = "none";
document.getElementById("signUpBackground").style.display = "block";
$("#signUpOrLogin").hide();
}
// sign up functionality
function signUp(){
var email = document.getElementById("email_fieldSignUp").value;
var password = document.getElementById("password_fieldSignUp").value;
var username = document.getElementById("userName_fieldSignUp").value;

//create a user in firebase
firebase.auth().createUserWithEmailAndPassword(email, password)
//add a custom username to firebase
    .then(function(user){
        var database = firebase.database();
        var user = firebase.auth().currentUser;
        function writeUserData(userId, username, email, ) {
            firebase.database().ref('users/' + userId).set({
              username: username,
              email: email,
              userId: user.uid,
            });
          }
    user.updateProfile({
        displayName: username,
   }).then(function(){
    console.log(user.displayName)
   })
   .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    $(".error").append("Error : "+ errorMessage)
  });
});

// control the state of the application and what is visible upon sign in
  firebase.auth().onAuthStateChanged(function(user) {

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

        document.getElementById("user_div").style.display = "block";
        var user = firebase.auth().currentUser;
        
        if(user != null){
            var email_id = user.emailSignUp;
            var name_id = userName_fieldSignUp;
            document.getElementById('user_para').innerHTML="Welcome User: " + document.getElementById("userName_fieldSignUp").value;
        }
    }
});
} // closing signup function

// login functionality
function login(){
var userEmail = document.getElementById("email_field").value;
var userPass = document.getElementById("password_field").value;

firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    $(".error").append(errorMessage)
  });

// control the state of the application and what is visible upon log in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      $("#logInBackground").hide();
      $("#time").show();
      $("#weather").show();
      $("#searchBar").show();
      $("#eventsTrigger").show();
      $("#quote").show();

      var user = firebase.auth().currentUser;
      console.log(user.displayName);


      if(user != null){
          var email_id = user.email;
          var hour = new Date().getHours();
          var greeting = "Good morning";
          if(hour >= 12 && hour <= 17) {
              greeting = "Good Afternoon";
          } else if(hour > 17 || hour < 5) {
              greeting = "Good Evening"
          }
          document.getElementById('user_para').innerHTML=greeting + " " + ((user.displayName) ? user.displayName : "") ;
        console.log('hour', );
        }
    } 
  }); // closing firebase auth
} // closing login function

// logout functionality
function logout(){
    firebase.auth().signOut();
    document.getElementById("email_field").value=' ';
    document.getElementById("password_field").value='';
    document.getElementById("login_div").style.display = "none";
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
}; // closing logout function

$(document).ready( function() {
    $("#time").hide();
    $("#weather").hide();
    $("#searchBar").hide();
    $("#eventsTrigger").hide();
    $("#quote").hide();
}); // closing ready function