
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

$("#submit-btn").on("click", function(event) {
    event.preventDefault();

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
  console.log("Train Added");
    // Add employee data to the database
    database.ref().push(newTrain);

    // Alert
    console.log("Train Added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// // Behavior when new train is added to db
// database.ref().on("child_added", function(childSnapshot, prevChildKey) {
//     // Create new train obj and add to #train-list div
//     makeRow(childSnapshot.val());
// });


