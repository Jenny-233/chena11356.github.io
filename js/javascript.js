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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  document.getElementById("greeting").innerHTML = "Hi, "+profile.getGivenName();
  document.getElementById("signInLink").style.visibility = "hidden";
  document.getElementById("signOutLink").style.visibility = "visible";
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  document.getElementById("greeting").innerHTML = "";
  document.getElementById("signInLink").style.visibility = "visible";
  document.getElementById("signOutLink").style.visibility = "hidden";
}

function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1yWsQtQbs6Uf3xxqj8TjBLg9cKm7dDf9jkCE6zxbFVE8/edit?usp=sharing',
                   callback: showInfo,
                   simpleSheet: true } )
}
function showInfo(data, tabletop) {
  alert('Successfully processed! '+data)

  /*
  var test = "";
  for (var i = 0; i < data.length; i++){
    test+=data[i];
  }
  console.log(test);*/

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
