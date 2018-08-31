var givenName;
var familyName;
var email;
var status;
var curStatus; //keep track of current status in records so we can tell if they need to be transferred
var appIndex;
var auth2;

  function initializeGlobal(){
    givenName = "givenName";
    familyName = "familyName";
    email = "email";
    status = "status";
    curStatus = "status";
    appIndex = -1;
  }

/**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        initializeGlobal();
        $(document).bind('function_a_complete', initializeApplicationHelper);
        gapi.load('client:auth2', initClient);
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
              /*
              auth2 = gapi.auth2.init({
                client_id: '1058472710733-bc8l9sjqt9fktohmeejv5jlgjbnccpfj.apps.googleusercontent.com'
              });
              // Attach the click handler to the sign-in button
              auth2.attachClickHandler('signInLink', {}, onSuccess, onFailure);*/
            }


            /*
            var onSuccess = function(user){
              //if user is signed in and on an application page, initialize application info
              if (gapi.auth2.getAuthInstance().isSignedIn.get()&&window.location.href.indexOf("classman")>=0){
                initializeApplication();
              }
              //if user is not signed in and on an application page, redirect to homepage
              if (!(gapi.auth2.getAuthInstance().isSignedIn.get())&&window.location.href.indexOf("classman")>=0){
                window.location.href = "index.html";
              }
            }

            var onFailure = function (error){
              alert('Click handler fail');
            }*/


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
      /*function listMajors() {
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
  //set global variables
  givenName = "givenName";
  familyName = "familyName";
  email = "email";
  status = "status";
  //if on an application page, return to front page
  if (window.location.href.indexOf("classman")>=0){
    widow.location.href="index.html";
  }
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
function findStatus(email){
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: '1FrHVeXNWCjov5MtHM4h8pNfQ007PiHReK07VSeTbbAc',
  range: 'Sheet1!A:D',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 1; i < range.values.length; i++) {
        var row = range.values[i];
        //appendPre("row[2] includes: "+row[2]);
        //row is array of arrays of last name, first name, email address, and status
        if ((row[2]+"").indexOf(email)>=0){
          status = row[3]+"";
          curStatus = row[3]+"";
          //appendPre("Status found: "+row[3]);
          $(document).trigger('function_a_complete');
          return;
        }
      }
      status = "N/A";
      $(document).trigger('function_a_complete');
    }
  });
}

//changes status of user given email address and new status
function changeStatus(email,updatedStatus){
  var userIndex = -1;
  var changeBody = {
    "majorDimension": "ROWS",
    "values": [
      [familyName, givenName, email, status],
    ],
  };
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: '1FrHVeXNWCjov5MtHM4h8pNfQ007PiHReK07VSeTbbAc',
  range: 'Sheet1!A:D',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 1; i < range.values.length; i++) {
        var row = range.values[i];
        //appendPre("row[2] includes: "+row[2]);
        //row is array of arrays of last name, first name, email address, and status
        if ((row[2]+"").indexOf(email)>=0){
          userIndex = i;
          break;
        }
      }
    }
  });
  gapi.client.sheets.spreadsheets.values.update({
     spreadsheetId: "1FrHVeXNWCjov5MtHM4h8pNfQ007PiHReK07VSeTbbAc",
     range: ("Sheet1!"+(userIndex+1)+":"+(userIndex+1)),
     valueInputOption: "USER_ENTERED",
     resource: changeBody
  }).then((response) => {
    var result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
    alert('Your application has been saved!');
  });
}

function appendNewPerson(){
var body = {
  "majorDimension": "ROWS",
  "values": [
    [familyName, givenName, email, "juniorProspective"],
  ],
};
gapi.client.sheets.spreadsheets.values.append({
   spreadsheetId: "1FrHVeXNWCjov5MtHM4h8pNfQ007PiHReK07VSeTbbAc",
   range: "Sheet1",
   valueInputOption: "USER_ENTERED",
   resource: body
}).then((response) => {
  var result = response.result;
  console.log(`${result.updates.updatedCells} cells appended.`)
});
}

//if user is signed in, initialize everything in application; else, redirect back to the main page
function initializeApplication(){
    //get rid of loading stuff and show the application
    document.getElementById("loadingText").style.display = "none";
    document.getElementById("loadingImg").style.display = "none";
    document.getElementById("application").style.display = "block";
    //get information
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    givenName = profile.getGivenName();
    familyName = profile.getFamilyName();
    email = profile.getEmail();
    //appendPre("User email: "+email);
    //look for user in main spreadsheet and get status:
    //freshman, sophomore, juniorProspective, seniorProspective, juniorCurrent, or seniorCurrent
    findStatus(email);
}

//runs after status is found and defined
function initializeApplicationHelper(){
  //appendPre("Result of findStatus: "+status);
  if (status.indexOf("N/A")>=0){
    //if person cannot be found in current nhs records, create new record for them (and set appIndex)
    appendNewPerson();
    //then, if they do decide to apply and save their application, make record for them in appropriate spreadsheet
  }
  else if (status.indexOf("seniorCurrent")>=0||status.indexOf("juniorCurrent")>=0){
    //if person is current junior/senior, alert that they are juniors/seniors on record and do not show application
    alert("It seems that you are a current NHS member. If this is incorrect, please contact nhs@bxscience.edu.");
    document.getElementById("application").style.display = "none";
  }
  else if (status.indexOf("freshman")>=0||status.indexOf("sophomore")>=0) {
    //if person is current underclassman, alert them that and still show application and get app info
    if (window.location.href.indexOf("upperclassman")>=0){
      alert("It seems that you are in our records as an underclassman. If you are ready, you may start your application as a junior or senior. All information will transfer over.");
    }
    //then, if they do decide to save their application as an upperclassman, transfer records into appropriate spreadsheet
    if (status.indexOf("freshman")>=0){
      retrieveApp("Freshman");
    }
    else{
      retrieveApp("Sophomore");
    }
  }
  else {
    //if person is prospective junior or senior, access their records and initialize application information
    if (status.indexOf("juniorProspective")>=0){
      retrieveApp("Junior");
    }
    else {
      retrieveApp("Senior");
    }
  }
}

function retrieveApp(currentGrade){
  document.getElementById("grade").innerHTML = currentGrade;
  var appSheetID;
  if (currentGrade.indexOf("Junior")>=0){
    appSheetID = '1T9iLfuDqvOz45ViN8Flqfyr6Kg4R-TO9ytXg_4AzV-E';
  }
  else if (currentGrade.indexOf("Senior")>=0){
    appSheetID = '183eXca8m7Wx0lsGCJ9dfALzU8wyz04S2x7CeKBOj1R0';
  }
  else if (currentGrade.indexOf("Freshman")>=0){
    appSheetID = '1GgpL8DCmVyRlYMOqN6caWC6z9RtSia84v9cCieSiwww';
  }
  else if (currentGrade.indexOf("Sophomore")>=0){
    appSheetID = '1ayL7Jk2_XUN1r4JzDLUZX6pyEYhMGWAAMSKJNQU4rsk';
  }
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: appSheetID,
  range: 'Applications',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 1; i < range.values.length; i++) {
        var row = range.values[i];
        //row is array of arrays of application info
        if ((row[3]+"").indexOf(email)>=0){ //when applicant is found
          appIndex = i;
          document.getElementById("lastNameInput").value = row[1]; //set last name
          document.getElementById("firstNameInput").value = row[2]; //set first name
          document.getElementById("osisInput").value = row[4]; //set osis
          document.getElementById("offInput").value = row[5]; //set official class
          document.getElementById("averageInput").value = row[6]; //set average
          if (row[7].trim().toLowerCase().indexOf("yes")>=0){ //set whether applicant failed a class
            document.getElementById("failedInput").checked = true;
            document.getElementById("failedInput2").checked = false;
          }
          else {
            document.getElementById("failedInput").checked = false;
            document.getElementById("failedInput2").checked = true;
          }
          if (row[8].trim().toLowerCase().indexOf("yes")>=0){ //set whether applicant has suspended privileges
            document.getElementById("suspendedInput").checked = true;
            document.getElementById("suspendedInput2").checked = false;
          }
          else {
            document.getElementById("suspendedInput").checked = false;
            document.getElementById("suspendedInput2").checked = true;
          }
          if (row[9].trim().toLowerCase().indexOf("freshman")>=0){ //set whether applicant came as freshman/sophomore
            document.getElementById("enteredAsSoph").checked = false;
            document.getElementById("serviceNeeded").innerHTML = "13";
            document.getElementById("leadershipNeeded").innerHTML = "50";
          }
          else {
            document.getElementById("enteredAsSoph").checked = true;
            document.getElementById("serviceNeeded").innerHTML = "8";
            document.getElementById("leadershipNeeded").innerHTML = "30";
          }

          var activityNum = 1;
          //make activities visible if the name is not empty
          for (var m = 10; m<=34; m=m+6){
            if ((row[m]+"").trim().length>0&&m>10){ //add activity if not empty and not #1
              addService();
            }
            if ((row[m]+"").trim().length<=0||row[m]===undefined){
              break;
            }
            if ((row[m]+"").trim().length>0){ //add information if not empty
              document.getElementById("serviceNameInput"+activityNum).value = row[m];
              if ((row[m+1]+"").trim().length>0){
                appendPre("row[m] is: "+row[m]);
                appendPre("m is "+m+" and this is row[m+1]: "+row[m+1]);
                document.getElementById("code"+activityNum).selectedIndex = getSelectedIndex(row[m+1]);
              }
              document.getElementById("creditInput"+activityNum).value = row[m+3];
              document.getElementById("facultyInput"+activityNum).value = row[m+4];
              document.getElementById("emailInput"+activityNum).value = row[m+5];
              activityNum++;
            }
          }
          activityNum = 1;
          for (var n = 40; n<=94; n=n+6){
            if ((row[n]+"").trim().length>0&&n>40){ //add activity if not empty and not #1
              addLeadership();
            }
            if ((row[n]+"").trim().length<=0||row[n]===undefined){
              break;
            }
            if ((row[n]+"").trim().length>0){ //add information if not empty
              document.getElementById("leadershipNameInput"+activityNum).value = row[n];
              if ((row[n+1]+"").trim().length>0){
                document.getElementById("lcode"+activityNum).selectedIndex = getSelectedIndex(row[n+1]);
              }
              document.getElementById("lcreditInput"+activityNum).value = row[n+3];
              document.getElementById("lfacultyInput"+activityNum).value = row[n+4];
              document.getElementById("lemailInput"+activityNum).value = row[n+5];
              activityNum++;
            }
          }

          document.getElementById("additionalInput").value = row[100]; //set additional information
          document.getElementById("electronicInput").value = row[101]; //set electronic signature

          var totalService = 0;
          var totalLeadership = 0;
          for (var b = 1; b<=5; b++){
            if (!isNaN(parseInt(document.getElementById("creditInput"+b).value))) {
              totalService += parseInt(document.getElementById("creditInput"+b).value);
            }
          }
          document.getElementById("serviceInput").innerHTML = totalService+"";
          for (var b = 1; b<=10; b++){
            if (!isNaN(parseInt(document.getElementById("lcreditInput"+b).value))) {
              totalLeadership += parseInt(document.getElementById("lcreditInput"+b).value);
            }
          }
          document.getElementById("leadershipInput").innerHTML = totalLeadership+"";

          break;
        }
      }
    }
  });
}

function getSelectedIndex(code){
  if (code.indexOf("S1")>=0||code.indexOf("L1")>=0){
    return 0;
  }
  else if (code.indexOf("S2")>=0||code.indexOf("L2")>=0){
    return 1;
  }
  else if (code.indexOf("S3")>=0||code.indexOf("L3")>=0){
    return 2;
  }
  else if (code.indexOf("S4")>=0||code.indexOf("L4")>=0){
    return 3;
  }
  else if (code.indexOf("S5")>=0||code.indexOf("L5")>=0){
    return 4;
  }
  else if (code.indexOf("C1")>=0){
    return 5;
  }
  else if (code.indexOf("C2")>=0){
    return 6;
  }
  else if (code.indexOf("C3")>=0){
    return 7;
  }
  else if (code.indexOf("C4")>=0){
    return 8;
  }
  else {
    return -1;
  }
}

function changeJunior(){
  status = "juniorProspective";
  if (document.getElementById("enteredAsSoph").checked){
    document.getElementById("serviceNeeded").innerHTML = "8";
    document.getElementById("leadershipNeeded").innerHTML = "30";
  }
  else {
    document.getElementById("serviceNeeded").innerHTML = "13";
    document.getElementById("leadershipNeeded").innerHTML = "50";
  }
}

function changeSenior(){
  status = "seniorProspective";
  if (document.getElementById("enteredAsSoph").checked){
    document.getElementById("serviceNeeded").innerHTML = "10";
    document.getElementById("leadershipNeeded").innerHTML = "40";
  }
  else {
    document.getElementById("serviceNeeded").innerHTML = "15";
    document.getElementById("leadershipNeeded").innerHTML = "60";
  }
}

//if sophomore checkbox is checked or unchecked, handle it
function handleChange(checkbox) {
    if(checkbox.checked == true){
        if (status.indexOf("juniorProspective")>=0){ //junior who entered as sophomore
          document.getElementById("serviceNeeded").innerHTML = "8";
          document.getElementById("leadershipNeeded").innerHTML = "30";
        }
        else{ //senior who entered as sophomore
          document.getElementById("serviceNeeded").innerHTML = "10";
          document.getElementById("leadershipNeeded").innerHTML = "40";
        }
    }else{
      if (status.indexOf("juniorProspective")>=0){ //junior who entered as freshman
        document.getElementById("serviceNeeded").innerHTML = "13";
        document.getElementById("leadershipNeeded").innerHTML = "50";
      }
      else{ //senior who entered as freshman
        document.getElementById("serviceNeeded").innerHTML = "15";
        document.getElementById("leadershipNeeded").innerHTML = "60";
      }
   }
}

function saveApp(){
  //recalculate total service and leadership, set into spans and spreadsheet
  var totalService = 0;
  var totalLeadership = 0;
  for (var b = 1; b<=5; b++){
    if (!isNaN(parseInt(document.getElementById("creditInput"+b).value))) {
      totalService += parseInt(document.getElementById("creditInput"+b).value);
    }
  }
  document.getElementById("serviceInput").innerHTML = totalService+"";
  for (var b = 1; b<=10; b++){
    if (!isNaN(parseInt(document.getElementById("lcreditInput"+b).value))) {
      totalLeadership += parseInt(document.getElementById("lcreditInput"+b).value);
    }
  }
  document.getElementById("leadershipInput").innerHTML = totalLeadership+"";

  //set the checkbox/radio responses into text
  var failed;
  var suspended;
  var incoming;
  if (document.getElementById("failedInput2").checked){
    failed = "No";
  }
  else {
    failed = "Yes";
  }
  if (document.getElementById("suspendedInput2").checked){
    suspended = "No";
  }
  else {
    suspended = "Yes";
  }
  if (document.getElementById("enteredAsSoph").checked){
    incoming = "Sophomore";
  }
  else {
    incoming = "Freshman";
  }

  var body = {
    "majorDimension": "ROWS",
    "values": [
      ["", familyName, givenName, email,
    document.getElementById("osisInput").value,
    document.getElementById("offInput").value,
    document.getElementById("averageInput").value,
    failed, suspended, incoming,
    document.getElementById("serviceNameInput1").value,
    document.getElementById("code1").options[document.getElementById("code1").selectedIndex].text,
    "",
    document.getElementById("creditInput1").value,
    document.getElementById("facultyInput1").value,
    document.getElementById("emailInput1").value,
    document.getElementById("serviceNameInput2").value,
    document.getElementById("code2").options[document.getElementById("code2").selectedIndex].text,
    "",
    document.getElementById("creditInput2").value,
    document.getElementById("facultyInput2").value,
    document.getElementById("emailInput2").value,
    document.getElementById("serviceNameInput3").value,
    document.getElementById("code3").options[document.getElementById("code3").selectedIndex].text,
    "",
    document.getElementById("creditInput3").value,
    document.getElementById("facultyInput3").value,
    document.getElementById("emailInput3").value,
    document.getElementById("serviceNameInput4").value,
    document.getElementById("code4").options[document.getElementById("code4").selectedIndex].text,
    "",
    document.getElementById("creditInput4").value,
    document.getElementById("facultyInput4").value,
    document.getElementById("emailInput4").value,
    document.getElementById("serviceNameInput5").value,
    document.getElementById("code5").options[document.getElementById("code5").selectedIndex].text,
    "",
    document.getElementById("creditInput5").value,
    document.getElementById("facultyInput5").value,
    document.getElementById("emailInput5").value,
    document.getElementById("leadershipNameInput1").value,
    document.getElementById("lcode1").options[document.getElementById("lcode1").selectedIndex].text,
    "",
    document.getElementById("lcreditInput1").value,
    document.getElementById("lfacultyInput1").value,
    document.getElementById("lemailInput1").value,
    document.getElementById("leadershipNameInput2").value,
    document.getElementById("lcode2").options[document.getElementById("lcode2").selectedIndex].text,
    "",
    document.getElementById("lcreditInput2").value,
    document.getElementById("lfacultyInput2").value,
    document.getElementById("lemailInput2").value,
    document.getElementById("leadershipNameInput3").value,
    document.getElementById("lcode3").options[document.getElementById("lcode3").selectedIndex].text,
    "",
    document.getElementById("lcreditInput3").value,
    document.getElementById("lfacultyInput3").value,
    document.getElementById("lemailInput3").value,
    document.getElementById("leadershipNameInput4").value,
    document.getElementById("lcode4").options[document.getElementById("lcode4").selectedIndex].text,
    "",
    document.getElementById("lcreditInput4").value,
    document.getElementById("lfacultyInput4").value,
    document.getElementById("lemailInput4").value,
    document.getElementById("leadershipNameInput5").value,
    document.getElementById("lcode5").options[document.getElementById("lcode5").selectedIndex].text,
    "",
    document.getElementById("lcreditInput5").value,
    document.getElementById("lfacultyInput5").value,
    document.getElementById("lemailInput5").value,
    document.getElementById("leadershipNameInput6").value,
    document.getElementById("lcode6").options[document.getElementById("lcode6").selectedIndex].text,
    "",
    document.getElementById("lcreditInput6").value,
    document.getElementById("lfacultyInput6").value,
    document.getElementById("lemailInput6").value,
    document.getElementById("leadershipNameInput7").value,
    document.getElementById("lcode7").options[document.getElementById("lcode7").selectedIndex].text,
    "",
    document.getElementById("lcreditInput7").value,
    document.getElementById("lfacultyInput7").value,
    document.getElementById("lemailInput7").value,
    document.getElementById("leadershipNameInput8").value,
    document.getElementById("lcode8").options[document.getElementById("lcode8").selectedIndex].text,
    "",
    document.getElementById("lcreditInput8").value,
    document.getElementById("lfacultyInput8").value,
    document.getElementById("lemailInput8").value,
    document.getElementById("leadershipNameInput9").value,
    document.getElementById("lcode9").options[document.getElementById("lcode9").selectedIndex].text,
    "",
    document.getElementById("lcreditInput9").value,
    document.getElementById("lfacultyInput9").value,
    document.getElementById("lemailInput9").value,
    document.getElementById("leadershipNameInput10").value,
    document.getElementById("lcode10").options[document.getElementById("lcode10").selectedIndex].text,
    "",
    document.getElementById("lcreditInput10").value,
    document.getElementById("lfacultyInput10").value,
    document.getElementById("lemailInput10").value,
    document.getElementById("additionalInput").value,
    document.getElementById("electronicInput").value,
    "",
    "",
    "",
    totalService,
    "",
    "",
    totalLeadership
    ],
    ],
  };

  if (curStatus.trim().indexOf(status)<0){ //if user changed their status, transfer to appropriate spreadsheet
    var oldSheet;
    var newSheet;
    if (curStatus.indexOf("juniorProspective")>=0){
      oldSheet = "1T9iLfuDqvOz45ViN8Flqfyr6Kg4R-TO9ytXg_4AzV-E";
    }
    else if (curStatus.indexOf("seniorProspective")>=0){
      oldSheet = "183eXca8m7Wx0lsGCJ9dfALzU8wyz04S2x7CeKBOj1R0";
    }
    else if (curStatus.indexOf("freshman")>=0){
      oldSheet = "1GgpL8DCmVyRlYMOqN6caWC6z9RtSia84v9cCieSiwww";
    }
    else if (curStatus.indexOf("sophomore")>=0){
      oldSheet = "1ayL7Jk2_XUN1r4JzDLUZX6pyEYhMGWAAMSKJNQU4rsk";
    }
    else {
      console.log("Error: curStatus is "+curStatus);
      return;
    }
    if (status.indexOf("juniorProspective")>=0){
      newSheet = "1T9iLfuDqvOz45ViN8Flqfyr6Kg4R-TO9ytXg_4AzV-E";
    }
    else if (status.indexOf("seniorProspective")>=0){
      newSheet = "183eXca8m7Wx0lsGCJ9dfALzU8wyz04S2x7CeKBOj1R0";
    }
    else if (status.indexOf("freshman")>=0){
      newSheet = "1GgpL8DCmVyRlYMOqN6caWC6z9RtSia84v9cCieSiwww";
    }
    else if (status.indexOf("sophomore")>=0){
      newSheet = "1ayL7Jk2_XUN1r4JzDLUZX6pyEYhMGWAAMSKJNQU4rsk";
    }
    else {
      console.log("Error: curStatus is "+curStatus);
      return;
    }
    var emptyBody = {
      "majorDimension": "ROWS",
      "values": [
        ["", familyName, givenName, email, "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
        "","","","","", "", "","","","","", "", "","","","","", "", "","","","",
        "", "", "","","","","", "", "","","","","", "", "","","","","", "", "",
        "","","","", "", "","","","","", "", "","","","","", "", "","","","",
        "", "", "","","","","", "", "", "", "", "", "", ""
      ],
      ],
    };
    //delete info from old sheet (but keep names and emails in case they come back
    //also since multiple people might be using sheet at same time)
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: oldSheet,
       range: ("Applications!"+(appIndex+1)+":"+(appIndex+1)),
       valueInputOption: "USER_ENTERED",
       resource: emptyBody
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
    });
    //add info to new sheet, change appIndex (with retrieveApp) and update list of all nhs members and prospects
    //WAIT WE CANT JUST APPEND WE NEED TO SEE IF THEY'RE THERE FIRST, so FIRST read and see if they're
    //in the sheet, and if not, then append, but if they ARE, then update
    var updateIndex = -1; //if -1, then append; if not, then update
    gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: newSheet,
    range: 'Applications',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        for (i = 1; i < range.values.length; i++) {
          var row = range.values[i];
          if ((row[3]+"").indexOf(email)>=0){
            updateIndex = i;
            break;
          }
        }
      }
    });
    if (updateIndex==-1){
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: newSheet,
        range: ("Applications!"),
        valueInputOption: "USER_ENTERED",
        resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`)
      });
    }
    else{
      gapi.client.sheets.spreadsheets.values.update({
         spreadsheetId: newSheet,
         range: ("Applications!"+(updateIndex)+":"+(updateIndex)),
         valueInputOption: "USER_ENTERED",
         resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
      });
    }
    curStatus = status;
    changeStatus(email,status); //changes status in list of all nhs members and prospects
    if (status.indexOf("juniorProspective")>=0){
      retrieveApp("Junior");
    }
    else if (status.indexOf("seniorProspective")>=0){
      retrieveApp("Senior");
    }
    else if (status.indexOf("freshman")>=0){
      retrieveApp("Freshman");
    }
    else if (status.indexOf("sophomore")>=0){
      retrieveApp("Sophomore");
    }
  }

  if (status.indexOf("juniorProspective")>=0){
    //assumes that appIndex has already been identified and is for the junior spreadsheet
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: "1T9iLfuDqvOz45ViN8Flqfyr6Kg4R-TO9ytXg_4AzV-E",
       range: ("Applications!"+(appIndex+1)+":"+(appIndex+1)),
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
      alert('Your application has been saved!');
    });
  }
  else if (status.indexOf("seniorProspective")>=0){
    //assumes that appIndex has already been identified and is for the senior spreadsheet
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: "183eXca8m7Wx0lsGCJ9dfALzU8wyz04S2x7CeKBOj1R0",
       range: ("Applications!"+(appIndex+1)+":"+(appIndex+1)),
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
      alert('Your application has been saved!');
    });
  }
  else if (status.indexOf("freshman")>=0){
    //assumes that appIndex has already been identified and is for the freshman spreadsheet
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: "1GgpL8DCmVyRlYMOqN6caWC6z9RtSia84v9cCieSiwww",
       range: ("Applications!"+(appIndex+1)+":"+(appIndex+1)),
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
      alert('Your application has been saved!');
    });
  }
  else if (status.indexOf("sophomore")>=0){
    //assumes that appIndex has already been identified and is for the sophomore spreadsheet
    gapi.client.sheets.spreadsheets.values.update({
       spreadsheetId: "1ayL7Jk2_XUN1r4JzDLUZX6pyEYhMGWAAMSKJNQU4rsk",
       range: ("Applications!"+(appIndex+1)+":"+(appIndex+1)),
       valueInputOption: "USER_ENTERED",
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
      alert('Your application has been saved!');
    });
  }
}

function deleteApp(){

}

//disables horizontal scrolling
var scrollEventHandler = function()
{
  window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);

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
