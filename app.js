// Initialize Firebase
var config = {
  apiKey: "AIzaSyC8idDK_qg-8uCli7qfO3iIOebHdM0Qw-k",
  authDomain: "train-scheduler-849e2.firebaseapp.com",
  databaseURL: "https://train-scheduler-849e2.firebaseio.com",
  projectId: "train-scheduler-849e2",
  storageBucket: "train-scheduler-849e2.appspot.com",
  messagingSenderId: "102859640331"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainDatabase = database.ref('/trains');

var test = [];

$('#submit-btn').on('click', addTrain);


// Submit function, sends form data to db
function addTrain(event) {

    event.preventDefault();

    database.ref('/trains');

    // Get input from the form fields
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();


    // Create an object using form inputs
    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    // Add train object to the database
    database.ref('/trains').push(newTrain);

    // Alert
    alert('Train added! Choo choo');

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
};

// Behavior when new train is added to db
trainDatabase.on("child_added", function(childSnapshot) {
    // Create new train obj and add to #train-list div
    makeRow(childSnapshot.val().name, childSnapshot.val().destination,
       childSnapshot.val().time, childSnapshot.val().frequency);
    calcNextMin(childSnapshot.val().time, childSnapshot.val().frequency);
    calcNextTime(childSnapshot.val().time, childSnapshot.val().frequency);
});


function calcNextMin (trainTime, trainFreq) {
    // console.log(trainTime);
    // console.log(trainFreq);
    var x = parseInt(trainFreq);

    var startTime = moment(trainTime, 'HH:mm');
    var startFreq = moment(trainFreq, 'm');
    var nextTrain = startTime.add(x, 'm');

    // console.log('start time', startTime);

    // console.log('next train time', nextTrain.format('HH:mm'));

    return nextTrain;
};

function calcNextTime (trainTime, trainFreq) {
    var x = calcNextMin(trainTime, trainFreq);
    var tilNext = updateTime(trainTime, trainFreq);
    var now = moment();
    
    console.log('tilNext pre', tilNext);
    
    tilNext = tilNext.fromNow();

    console.log('tilNext', tilNext);

    // // tilNext = tilNext.format('s');
    // tilNext = parseInt(tilNext.valueOf());
    


    // setTimeout (function(){}, tilNext*1000);
    
    return tilNext
}



//Takes an emp (employee) object and adds a new row to #empList with employee data
function makeRow(trainName, trainDest, trainTime, trainFreq) {

    var newTrain = $("<tr>");
    var name = $("<td>").text(trainName.toUpperCase());
    var destination = $("<td>").text(trainDest.toUpperCase());
    var frequency = $("<td class='center'>").text(trainFreq);
    var next = $("<td class='center'>").text(updateTime(trainTime, trainFreq).format('HH:mm'));
    var min = $("<td class='next center'>").text(calcNextTime(trainTime, trainFreq));

    newTrain.append(name, destination, frequency, next, min);
    $("#train-list").append(newTrain);
}

function updateTime(trainTime, trainFreq) {
    var firstTime = moment(trainTime, 'HH:mm'); 
    var now = moment();

    // console.log('firstTime', trainTime.toNow());
    console.log('trainTime', trainTime);
    console.log('firstTime', firstTime.format('HH:mm'));

    while (firstTime.diff(now, "m") < 0) {
        firstTime = firstTime.add(parseInt(trainFreq), 'm')
    }
    
    console.log(now);
    return firstTime
}


function resetTrain() {
    database.ref('/trains').remove();
}
