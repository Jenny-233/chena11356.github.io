var givenName = "givenName";
var familyName = "familyName";
var email = "email";
var status = "status";

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
