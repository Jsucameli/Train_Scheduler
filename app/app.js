var config = {
  apiKey: "AIzaSyB_r54x0CoJe9jITUKxLenQsfg-tCwOYJk",
  authDomain: "classawsome-f4190.firebaseapp.com",
  databaseURL: "https://classawsome-f4190.firebaseio.com",
  projectId: "classawsome-f4190",
  storageBucket: "classawsome-f4190.appspot.com",
  messagingSenderId: "946248005048"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var name = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var first = moment($("#first-input").val().trim(), "HH:mm").format("h:mm a");
  var freq = $("#freq-input").val().trim();
  console.log(first);


  var newTrain = {
    name: name,
    destination: dest,
    firstTrainTime: first,
    frequency: freq
  };

  database.ref().push(newTrain);


  console.log(newTrain);

  // alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

//
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var first = childSnapshot.val().firstTrainTime;
  var freq = childSnapshot.val().frequency;

  console.log(name);
  console.log(dest);
  console.log(first);
  console.log(freq);


  var firstTimeConverted = moment(first, "HHmm").subtract(1, "years");
console.log(firstTimeConverted);

    var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freq;
console.log(tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("h:mm a");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  var awesomeRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  );


  $("#train-table > tbody").append(awesomeRow);
});
