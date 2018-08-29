var givenName = "givenName";
var familyName = "familyName";
var email = "email";
var status = "status";

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
        }
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

//if user is signed in, initialize everything; else, redirect back to the main page
if (gapi.auth2.getAuthInstance().isSignedIn.get()){
  //get information
  var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  givenName = profile.getGivenName();
  familyName = profile.getFamilyName();
  email = profile.getEmail();
  //look for user in main spreadsheet and get status:
  //freshman, sophomore, juniorProspective, seniorProspective, juniorCurrent, or seniorCurrent
  status = findStatus(email);
}
else {
  window.location.href = "index.html";
}
