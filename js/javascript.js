// Client ID and API key from the Developer Console
var CLIENT_ID = '1058472710733-h26avqn1bqhu5tgn1949b2i06757u61v.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCBL6g4WUbDZCSScitz7VYBzXTFsCMgNfg';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets profile email";

var authorizeButton = document.getElementById('signInLink');
var signoutButton = document.getElementById('signOutLink');

var auth2;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {

  auth2 = gapi.auth2.init({
    client_id: '1058472710733-bc8l9sjqt9fktohmeejv5jlgjbnccpfj.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin', /** Default value **/
    scope: 'profile' });                /** Base scope **/

  var options = new gapi.auth2.SigninOptionsBuilder(
    {'scope': 'email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'});

  googleUser = auth2.currentUser.get();
  googleUser.grant(options).then(
      function(success){
        console.log(JSON.stringify({message: "success", value: success}));
      },
      function(fail){
        alert(JSON.stringify({message: "fail", value: fail}));
      });



  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });




}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.visibility = 'hidden';
    signoutButton.style.visibility = 'visible';
    //update stuff here
  } else {
    authorizeButton.style.visibility = 'visible';
    signoutButton.style.visibility = 'hidden';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
  var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  //make sure it is a Bronx Science account
  /*if (profile.getEmail().indexof("@bxscience.edu")<0){
    alert("Please sign in with a Bronx Science email.");
    signOut();
  }*/
  //else {
    document.getElementById("signInLink").style.visibility = "hidden";
    //change the greeting
    //$('.greeting').append("<h5 class='my-2 my-lg-0 px-1 greetingText' style='color: #B8BAB9;'>Hi, "+profile.getGivenName()+".</h5>");
    document.getElementById("greetingText").innerHTML = "Hi, "+profile.getGivenName()+".</h5>";
    //make sign-out link visible
    document.getElementById("signOutLink").style.visibility = "visible";
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  document.getElementById("greetingText").innerHTML = "";
  document.getElementById("signInLink").style.visibility = "visible";
  document.getElementById("signOutLink").style.visibility = "hidden";
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit

function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('Name, Major:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}*/

function main(){
  /*var app = new Vue({
    el: '#test',
    data: {
      message: 'Hello, Vue!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
  })*/
}

/*function parseName(name){
  var array1 = name.split(' ');
  var newarray1 = [];

  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}*/

function onSignIn(googleUser) {
  var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  //make sure it is a Bronx Science account
  /*if (profile.getEmail().indexof("@bxscience.edu")<0){
    alert("Please sign in with a Bronx Science email.");
    signOut();
  }*/
  //else {
    document.getElementById("signInLink").style.visibility = "hidden";
    //change the greeting
    //$('.greeting').append("<h5 class='my-2 my-lg-0 px-1 greetingText' style='color: #B8BAB9;'>Hi, "+profile.getGivenName()+".</h5>");
    document.getElementById("greetingText").innerHTML = "Hi, "+profile.getGivenName()+".</h5>";
    //make sign-out link visible
    document.getElementById("signOutLink").style.visibility = "visible";
  //}
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  document.getElementById("greetingText").innerHTML = "";
  document.getElementById("signInLink").style.visibility = "visible";
  document.getElementById("signOutLink").style.visibility = "hidden";
}

function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1yWsQtQbs6Uf3xxqj8TjBLg9cKm7dDf9jkCE6zxbFVE8/edit?usp=sharing',
                   callback: showInfo,
                   parseNumbers: true,
                   //simpleSheet: true
                  } )
}
function showInfo(data, tabletop) {
  data = tabletop.sheets("main").toArray();
  //so now data is a 2D array


  //console.log(tabletop.sheets("main").toArray()[0][0]);
  /*
  data = tabletop.sheets("main").toArray();
  //all data sent into a 1D array, so convert that into a 2D array
  //5 variables --> given name, family name, email, grade, probations



  var test = "";
  for (var i = 0; i < data.length; i++){
    test+=data[i];
  }
  console.log(test);
  */

}
window.addEventListener('DOMContentLoaded', init)

/*var auth2 = gapi.auth2.getAuthInstance();
  if (auth2.isSignedIn.get()) {
  var profile = auth2.currentUser.get().getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
} */

window.onload = main();
