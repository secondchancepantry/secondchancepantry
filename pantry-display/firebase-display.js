// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjLOCnFetZBaMBqLoAxQOJiuve81ijJlU",
    authDomain: "secondchancepantry-f65c5.firebaseapp.com",
    databaseURL: "https://secondchancepantry-f65c5.firebaseio.com",
    storageBucket: "secondchancepantry-f65c5.appspot.com",
    messagingSenderId: "1083855170391"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref.on("value", function(snapshot) {
  	
  console.log(snapshot.val());
  $("#ingredients-item1").val().trim().text(snapshot);
  $("#ingredients-item2").val().trim().text(snapshot);
  $("#ingredients-item3").val().trim().text(snapshot);


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#ingredients-item1").on('click'.function(){

   $('#ingredients-item1').hide()

});

