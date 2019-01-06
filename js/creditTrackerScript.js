var givenName;
var familyName;
var email;
var status;
var userIndex;
var appIndex;

var serviceCredits;
var projectCredits;
var tutoringCredits;
var probations;
var serviceActivities;
var serviceActivityCredits;
var projectActivities;
var projectActivityCredits;

function initializeGlobal2(){
  givenName = "givenName";
  familyName = "familyName";
  email = "email";
  status = "status";
  userIndex = -1;
  appIndex = -1;
  serviceCredits = 0;
  projectCredits = 0;
  tutoringCredits = 0;
  probations = 0;
  serviceActivities = [];
  serviceActivityCredits = [];
  projectActivities = [];
  projectActivityCredits = [];
}

function convertToZeroIfEmpty(input){
  if ((input+"").length==0){
    input = 0;
  }
  return input;
}

function initializeTracker(callback){
  //make sure user is signed in
  if (gapi.auth2.getAuthInstance().isSignedIn.get()){
    //show loading stuff
    document.getElementById("loadingText").style.display = "block";
    document.getElementById("loadingImg").style.display = "block";
    document.getElementById("appButton").style.display = "none";
    console.log("Showing loading stuff");
    //get information
    var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    givenName = profile.getGivenName();
    familyName = profile.getFamilyName();
    email = profile.getEmail();
    console.log("Given name is "+givenName);
    console.log("Family name is "+familyName);
    console.log("Email is "+email);
    //appendPre("User email: "+email);
    //look for user in main spreadsheet and get status:
    //freshman, sophomore, juniorProspective, seniorProspective, juniorCurrent, or seniorCurrent
    gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: CryptoJS.AES.decrypt("U2FsdGVkX18kEuc0waEbwGgL1/rvnxgbHleT2o9MxdM13zbc6F3A2g/lUY/bSNZyxklDxPYUSG//Vxr7rf3GBw==", "nhs").toString(CryptoJS.enc.Utf8),
    range: 'Sheet1!A:D',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        for (var i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          console.log(row[2]); //should log the emails
          //row is array of arrays of last name, first name, email address, and status
          if ((row[2]+"").indexOf(email)>=0){
            status = row[3]+"";
            userIndex = i;
            console.log("Found user at userIndex "+userIndex+" and status is "+status);
            callback(initializeTracker2);
            break;
          }
        }
      }
    });
  }
  else{
    alert("To use this service, please sign in using your bxscience.edu email.")
  }
}

function initializeTracker1(callback){
  document.getElementById("loadingText").style.display = "none";
  document.getElementById("loadingImg").style.display = "none";
  document.getElementById("tracker").style.display = "block";
  console.log("Showing application");
  if (!(status.indexOf("seniorCurrent")>=0||status.indexOf("juniorCurrent")>=0)){
    alert("It seems that you are not a current NHS member. If this is incorrect, please contact chena@bxscience.edu.");
    document.getElementById("tracker").style.display = "none";
    return;
  }
  else {
    var creditSheetID;
    if (status.indexOf("seniorCurrent")>=0){
      //retrieve information from senior spreadsheet
      creditSheetID = "1yQkpeLWwiS8R4ngrkCvbF_tdFgK_PkgzbQPG3y_RbwA";
    }
    else{
      //retrieve information from junior spreadsheet
      creditSheetID = "1kgcIOqlAVqofPiqqIkWTXGeQ5YWcTMW1Jk-gWjkVE1s";
    }
    //then connect to the spreadsheet and get all the information needed
    gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: creditSheetID,
    range: 'Credits',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        //first get necessary indices
        var TOTALTUTORINGINDEX = -1;
        var TOTALPROJECTSINDEX = -1;
        var TOTALSERVICEINDEX = -1;
        var temp = "";
        for (var i = 0; i < range.values[0].length; i++){
          temp = range.values[0][i];
          if (temp.indexOf("TOTAL TUTORING")>=0){
            TOTALTUTORINGINDEX = i;
          }
          else if (temp.indexOf("TOTAL PROJECTS")>=0){
            TOTALPROJECTSINDEX = i;
          }
          else if (temp.indexOf("TOTAL SERVICE")>=0){
            TOTALSERVICEINDEX = i;
          }
        }
        if (TOTALTUTORINGINDEX==-1){
          console.log("Error: cannot find total tutoring index");
        }
        if (TOTALPROJECTSINDEX==-1){
          console.log("Error: cannot find total projects index");
        }
        if (TOTALSERVICEINDEX==-1){
          console.log("Error: cannot find total service index");
        }
        for (var i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          //row is array of arrays of application info
          if ((row[2]+"").indexOf(email)>=0){ //when applicant is found by email
            appIndex = i;
            probations = convertToZeroIfEmpty(row[3]);
            for (var j = 4; j < TOTALTUTORINGINDEX; j++){
              console.log("This is "+row[j]);
              if (row[j].indexOf("service")>=0){ //if cell in range has the word "service", add the service activity and number of credits into the arrays
                serviceActivities.push(range.values[0][j]);
                serviceActivityCredits.push(row[j]);
                console.log("Adding "+row[j]+" credits from "+range.values[0][j]);
              }
              else if (row[j].indexOf("project")>=0){
                projectActivities.push(range.values[0][j]);
                projectActivityCredits.push(row[j]);
                console.log("Adding "+row[j]+" credits from "+range.values[0][j]);
              }
            }
            serviceCredits = row[TOTALSERVICEINDEX];
            projectCredits = row[TOTALPROJECTSINDEX];
            tutoringCredits = row[TOTALTUTORINGINDEX];
            callback();
            break;
          }
        }
      }
    });
  }
}

function initializeTracker2(){
  document.getElementById("numberServiceCredits").innerHTML = serviceCredits;
  document.getElementById("numberProjectCredits").innerHTML = projectCredits;
  document.getElementById("numberTutoringCredits").innerHTML = tutoringCredits;
  document.getElementById("numberProbations").innerHTML = probations;
  document.getElementById("numberServiceCreditsOverview").innerHTML = serviceCredits;
  document.getElementById("numberProjectCreditsOverview").innerHTML = projectCredits;
  document.getElementById("numberTutoringCreditsOverview").innerHTML = tutoringCredits;
  document.getElementById("numberProbationsOverview").innerHTML = probations;
  var temp = "";
  var temp2 = "";
  for (var i = 0; i < serviceActivities.length;i++){
    temp2 = "<li>"+serviceActivityCredits[i]+" from "+serviceActivities[i]+"</li>"
    temp+=temp2;
  }
  document.getElementById("serviceActivitiesUL").innerHTML = temp;
  temp = "";
  temp2 = "";
  for (var i = 0; i < projectActivities.length;i++){
    temp2 = "<li>"+projectActivityCredits[i]+" from "+projectActivities[i]+"</li>";
    temp+=temp2;
  }
  document.getElementById("projectActivitiesUL").innerHTML = temp;
  setServiceOpportunitiesText();
  setProjectOpportunitiesText();
  setProbationsText(probations);
}

function setProbationsText(numProbations){
  var text="";
  if (numProbations==0){
    text = "Good job!";
  }
  else if (numProbations==1){
    text = "You can earn an extra project credit to remove this probation.";
  }
  else if (numProbations==2){
    text = "That's not good. You can earn extra project credits to remove probations.";
  }
  else if (numProbations==3){
    text = "If you receive another probation, you will be dismissed from NHS and your guidance counselor will be informed. You can earn extra project credits to remove probations.";
  }
  if (numProbations>0){
    text+=" If you see an error with your probations, please contact nhs@bxscience.edu immediately."
  }
  document.getElementById("probationsText").innerHTML = text;
}

function setProjectOpportunitiesText(){
  var text = "Based on previous years, there are approximately <b>"+calculateProjectOpportunities()+"</b> opportunities remaining in this semester to accumulate project credits. Please note that some of these opportunities may allow you to earn more than 1 credit at once, that some events may overlap with service opportunities, and that this estimate may not be 100% accurate.";
  document.getElementById("projectOpportunities").innerHTML = text;
}

function calculateProjectOpportunities(){
  var curDate = new Date().toLocaleDateString();
  var curMonth = parseInt(curDate.split("/")[0],10);
  var curDay = parseInt(curDate.split("/")[1],10);
  var curYear = parseInt(curDate.split("/")[2],10);
  var res = "";
  if (curYear!=2019){
    alert("It appears the year is no longer 2019. Please update the function calculateProjectOpportunities().");
    return 0;
  }
  else{
    if (curMonth==1){
      if (curDay>=1&&curDay<=28){
        return 0;
      }
      else {
        return 15;
      }
    }
    else if (curMonth==2){
      if (curDay>=1&&curDay<=14){
        return 15;
      }
      else {
        return 14;
      }
    }
    else if (curMonth==3){
      if (curDay>=1&&curDay<=8){
        return 14;
      }
      else if (curDay<=27){
        return 13;
      }
      else if (curDay<=29){
        return 12;
      }
      else {
        return 11;
      }
    }
    else if (curMonth==4){
      if (curDay>=1&&curDay<=25){
        return 11;
      }
      else {
        return 10;
      }
    }
    else if (curMonth==5){
      if (curDay>=1&&curDay<=24){
        return 10;
      }
      else if (curDay<=29){
        return 8;
      }
      else if (curDay<=30){
        return 7;
      }
      else {
        return 6;
      }
    }
    else if (curMonth==6){
      if (curDay==1){
        return 5;
      }
      else if (curDay<=4){
        return 3;
      }
      else if (curDay<=7){
        return 2;
      }
      else{
        return 0;
      }
    }
    else{
      return 0;
    }
  }
}

function setServiceOpportunitiesText(){
  var text = "Based on previous years, there are approximately <b>"+calculateServiceOpportunities()+"</b> opportunities remaining in this semester to accumulate service credits. Please note that some of these opportunities may allow you to earn more than 1 credit at once, that some of these events may overlap with project opportunities, and that this estimate may not be 100% accurate.";
  document.getElementById("serviceOpportunities").innerHTML = text;
}

function calculateServiceOpportunities(){
  var curDate = new Date().toLocaleDateString();
  var curMonth = parseInt(curDate.split("/")[0],10);
  var curDay = parseInt(curDate.split("/")[1],10);
  var curYear = parseInt(curDate.split("/")[2],10);
  var res = "";
  if (curYear!=2019){
    alert("It appears the year is no longer 2019. Please update the function calculateServiceOpportunities().");
    return 0;
  }
  else{
    if (curMonth==1){
      if (curDay>=1&&curDay<=28){
        return 0;
      }
      else {
        return 21;
      }
    }
    else if (curMonth==2){
      if (curDay>=1&&curDay<=9){
        return 21;
      }
      else if (curDay<=14){
        return 20;
      }
      else {
        return 19;
      }
    }
    else if (curMonth==3){
      if (curDay>=1&&curDay<=8){
        return 19;
      }
      else if (curDay<=29){
        return 18;
      }
      else {
        return 17;
      }
    }
    else if (curMonth==4){
      if (curDay>=1&&curDay<=16){
        return 17;
      }
      else if (curDay<=23){
        return 16;
      }
      else if (curDay<=26){
        return 15;
      }
      else {
        return 14;
      }
    }
    else if (curMonth==5){
      if (curDay>=1&&curDay<=4){
        return 14;
      }
      else if (curDay<=23){
        return 12;
      }
      else if (curDay<=24){
        return 11;
      }
      else if (curDay<=25){
        return 10;
      }
      else if (curDay<=29){
        return 8;
      }
      else {
        return 7;
      }
    }
    else if (curMonth==6){
      if (curDay==1){
        return 5;
      }
      else if (curDay<=7){
        return 1;
      }
      else{
        return 0;
      }
    }
    else{
      return 0;
    }
  }
}

function calculateOfficeHoursWeeksLeft(){
  var curDate = new Date().toLocaleDateString();
  var curMonth = parseInt(curDate.split("/")[0],10);
  var curDay = parseInt(curDate.split("/")[1],10);
  var curYear = parseInt(curDate.split("/")[2],10);
  if (curYear!=2019){
    alert("It appears the year is no longer 2019. Please update the function calculateOfficeHoursWeeksLeft().");
    return 0;
  }
  else{
    if (curMonth==1){
      if (curDay>=1&&curDay<=12){
        return 2;
      }
      else if (curDay<=19){
        return 1;
      }
      else if (curDay<=28){
        return 0;
      }
      else {
        return 18;
      }
    }
    else if (curMonth==2){
      if (curDay==1||curDay==2){
        return 18;
      }
      else if (curDay<=9){
        return 17;
      }
      else if (curDay<=16){
        return 16;
      }
      else {
        return 15;
      }
    }
    else if (curMonth==3){
      if (curDay==1||curDay==2){
        return 15;
      }
      else if (curDay<=9){
        return 14;
      }
      else if (curDay<=16){
        return 13;
      }
      else if (curDay<=23){
        return 12;
      }
      else if (curDay<=30){
        return 11;
      }
      else {
        return 10;
      }
    }
    else if (curMonth==4){
      if (curDay>=1&&curDay<=6){
        return 10;
      }
      else if (curDay<=13){
        return 9;
      }
      else if (curDay<=20){
        return 8;
      }
      else {
        return 7;
      }
    }
    else if (curMonth==5){
      if (curDay>=1&&curDay<=4){
        return 7;
      }
      else if (curDay<=11){
        return 6;
      }
      else if (curDay<=18){
        return 5;
      }
      else if (curDay<=25){
        return 4;
      }
      else {
        return 3;
      }
    }
    else if (curMonth==6){
      if (curDay==1){
        return 3;
      }
      else if (curDay<=8){
        return 2;
      }
      else if (curDay<=15){
        return 1;
      }
      else{
        return 0;
      }
    }
    else{
      return 0;
    }
  }
}

function setOfficeHoursText(){
  var weeksLeft = calculateOfficeHoursWeeksLeft();
  var text = "There are <b>"+weeksLeft+"</b> weeks remaining in this semester for office hours.";
  if (weeksLeft==0){
    text += "";
  }
  else if (weeksLeft<=4){
    text += " If you haven't already fulfilled your tutoring credits, please get them in ASAP!";
  }
  else if (weeksLeft<=8){
    text += " Please schedule your time accordingly, especially as we draw closer to the end of the semester.";
  }
  else if (weeksLeft<=11){
    text += " Please schedule your time accordingly."
  }
  else {
    text += " Please note that this is an estimate based on previous years, and may change.";
  }
  document.getElementById("officeHoursText").innerHTML = text;
}

initializeGlobal2();
setOfficeHoursText();
//$(document).bind('function_e_complete', initializeTrackerHelper);
//$(document).bind('function_d_complete', changeTrackerInfo);
