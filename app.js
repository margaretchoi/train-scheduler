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


// Submit function, sends form data to db
function addTrain(event) {

    // event.preventDefault();

    console.log("Start");

    database.ref('/trains');

    // Get input
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    // Add employee data to the database
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
    console.log(trainTime);
    console.log(trainFreq);
    var x = parseInt(trainFreq);

    var startTime = moment(trainTime, 'HH:mm');
    var startFreq = moment(trainFreq, 'm');
    var nextTrain = startTime.add(x, 'm');

    console.log('start time', startTime);

    console.log('next train time', nextTrain.format('HH:mm'));

    return nextTrain.format('HH:mm');
};

function calcNextTime (trainTime, trainFreq) {
    calcNextMin(trainTime, trainFreq);
}

//Takes an emp (employee) object and adds a new row to #empList with employee data
function makeRow(trainName, trainDest, trainTime, trainFreq) {

    var newTrain = $("<tr>");
    var name = $("<td>").text(trainName);
    var destination = $("<td>").text(trainDest);
    var frequency = $("<td>").text(trainFreq);
    var next = $("<td>").text(calcNextMin(trainTime, trainFreq));
    var min = $("<td>").text(calcNextTime(trainTime, trainFreq));

    newTrain.append(name, destination, frequency, next, min);
    $("#train-list").append(newTrain);
}
