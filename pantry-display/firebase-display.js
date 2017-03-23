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
  var userRef = firebase.database().ref('/users');
  var IngredientList = [];

  database.ref().on("value", function(snapshot) {
    
  
  var data = snapshot.val();
  IngredientList = data.users.ingredients;


  ingredientsInDatabase(IngredientList);
  expire(IngredientList);
  

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function expire(snapshot) {

    $( "#date-picker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
   
};


function ingredientsInDatabase(snapshot) {

     var expire = $( "#date-picker" ).datepicker({
      changeMonth: true,
      changeYear: true
      });
  
     
      var insideList = snapshot;
      
     
      if (!Array.isArray(insideList)) {
        insideList = [];
      }
      $("#ingredients-list").empty();
      $("#expire-button").empty();
      for (var i = 0; i < insideList.length; i++) {
        var ingsButton = $("<button class='ingredient-button delete'>").text(insideList[i]).attr("data-index", i);
        var expireButton = $( "<p id="+ insideList[i] +">Date: <input type='text' id='date-picker'></p>");
        $("#ingredients-list").prepend(ingsButton);
        $("#expire-button").prepend(expireButton);
      }

};


// database.ref().on("child_removed", function(snapshot) {

//   // var deletedPost = snapshot.val();

//   console.log(snapshot);

//   // var data = snapshot;

//   // var ingredients = data.users.ingredients;

//   // database.ref().update({

//   //   ingredients: ingredients;
        
        
//   // });
//   console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
// });

$(document).on("click", "button.delete",  function(snapshot) {

  debugger;
      // get name of ingredient
      var name = $(this).text();
      // find index of name in IngredientList
      var index = IngredientList.indexOf(name);
      // console.log(index)
      // console.log( IngredientList.indexOf(name));
      // remove name from IngredientList
      IngredientList.splice(index, 1);

      event.preventDefault();

       userRef.update({

        id: "user",
        ingredients: IngredientList
     


      });

     $("#" + name).remove();

      $(this).remove();

      
      
});
    