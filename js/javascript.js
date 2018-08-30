var givenName = "givenName";
var familyName = "familyName";
var email = "email";
var status = "status";

/**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
        //if user is signed in and on an application page, initialize application info
        if (gapi.auth2.getAuthInstance().isSignedIn.get()&&window.location.href.indexOf("classman")>=0){
          initializeApplication();
        }
        //if user is not signed in and on an application page, redirect to homepage
        if (!(gapi.auth2.getAuthInstance().isSignedIn.get())&&window.location.href.indexOf("classman")>=0){
          window.location.href = "index.html";
        }
      }

      /**
             *  Initializes the API client library
             */
            function initClient() {
              gapi.client.init({
                apiKey: 'AIzaSyCBL6g4WUbDZCSScitz7VYBzXTFsCMgNfg',
                clientId: '1058472710733-bc8l9sjqt9fktohmeejv5jlgjbnccpfj.apps.googleusercontent.com',
                discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
                scope: "profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly"
              });
            }


/**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
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
      }

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
  if (profile.getEmail().indexOf("@bxscience.edu")<0){
    alert("Please sign in with a Bronx Science email. You have been signed out.");
    signOut();
  }
  else {
    document.getElementById("signInLink").style.display = "none";
    //change the greeting
    //$('.greeting').append("<h5 class='my-2 my-lg-0 px-1 greetingText' style='color: #B8BAB9;'>Hi, "+profile.getGivenName()+".</h5>");
    document.getElementById("greetingText").innerHTML = "Hi, "+profile.getGivenName()+".</h5>";
    //make sign-out link visible
    document.getElementById("signOutLink").style.display = "block";
  }
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  document.getElementById("greetingText").innerHTML = "";
  document.getElementById("signInLink").style.display = "block";
  document.getElementById("signOutLink").style.display = "none";
}

//makes service activity visible; if all visible, then get rid of add service link
function addService(){
  if (document.getElementById("serviceForm4").style.display == "block"){
    document.getElementById("serviceForm5").style.display = "block";
    document.getElementById("addActivity").style.display = "none";
  }
  else if (document.getElementById("serviceForm3").style.display == "block"){
    document.getElementById("serviceForm4").style.display = "block";
  }
  else if (document.getElementById("serviceForm2").style.display == "block"){
    document.getElementById("serviceForm3").style.display = "block";
  }
  else {
    document.getElementById("serviceForm2").style.display = "block";
  }

}

//makes leadership/citizenship activity visible; if all visible, then get rid of add leadership link
function addLeadership(){
  if (document.getElementById("leadershipForm9").style.display == "block"){
    document.getElementById("leadershipForm10").style.display = "block";
    document.getElementById("laddActivity").style.display = "none";
  }
  else if (document.getElementById("leadershipForm8").style.display == "block"){
    document.getElementById("leadershipForm9").style.display = "block";
  }
  else if (document.getElementById("leadershipForm7").style.display == "block"){
    document.getElementById("leadershipForm8").style.display = "block";
  }
  else if (document.getElementById("leadershipForm6").style.display == "block"){
    document.getElementById("leadershipForm7").style.display = "block";
  }
  else if (document.getElementById("leadershipForm5").style.display == "block"){
    document.getElementById("leadershipForm6").style.display = "block";
  }
  else if (document.getElementById("leadershipForm4").style.display == "block"){
    document.getElementById("leadershipForm5").style.display = "block";
  }
  else if (document.getElementById("leadershipForm3").style.display == "block"){
    document.getElementById("leadershipForm4").style.display = "block";
  }
  else if (document.getElementById("leadershipForm2").style.display == "block"){
    document.getElementById("leadershipForm3").style.display = "block";
  }
  else {
    document.getElementById("leadershipForm2").style.display = "block";
  }

}

//directs user to link if signed in; otherwise, alerts user to sign in
function redirectIfSignedIn(link){
  if (gapi.auth2.getAuthInstance().isSignedIn.get()){
    window.location.href = link;
  }
  else{
    alert('To use this service, please sign in using your bxscience.edu email.')
  }
}

//finds status of user given email address
function findStatus(emailAddress){
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: '1FrHVeXNWCjov5MtHM4h8pNfQ007PiHReK07VSeTbbAc',
  range: 'Sheet1!A:D',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      console.log('testing findStatus');
      for (i = 1; i < range.values.length; i++) {
        var row = range.values[i];
        //row is array of arrays of last name, first name, email address, and status
        if (row[3].trim()=="chena@bxscience.edu"){
          console.log('found alex');
          return row[4];
        }
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

//if user is signed in, initialize everything in application; else, redirect back to the main page
function initializeApplication(){
  if (gapi.auth2.getAuthInstance().isSignedIn.get()){
    //get information
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    givenName = profile.getGivenName();
    familyName = profile.getFamilyName();
    email = profile.getEmail();
    //look for user in main spreadsheet and get status:
    //freshman, sophomore, juniorProspective, seniorProspective, juniorCurrent, or seniorCurrent
    listMajors();
    status = findStatus(email);
  }
  else {
    window.location.href = "index.html";
  }
}

/*function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1yWsQtQbs6Uf3xxqj8TjBLg9cKm7dDf9jkCE6zxbFVE8/edit?usp=sharing',
                   callback: showInfo,
                   parseNumbers: true,
                   //simpleSheet: true
                  } )
}*/

//function showInfo(data, tabletop) {
  //data = tabletop.sheets("main").toArray();
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

//}
//window.addEventListener('DOMContentLoaded', init)

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
