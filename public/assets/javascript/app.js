var ingredients;
var pantryList = [];
var IngredientList = [];
var selectedIngredientList = [];
var user = {};
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

$('#submit-btn').on('click', function() {
    ingredients = $('#ingredient-input').val().trim();
     IngredientList.push(ingredients);
     $('#ingredient-container').prepend(`<p><button class='btn btn-success ingredient'>${ingredients}</button></p>`);
     $('#ingredient-input').val('');

    console.log(IngredientList);
    userRef.set({
        id: "user",
        ingredients:IngredientList
    });

})


var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
	  var token = result.credential.accessToken;
	  user = result.user;
   }).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
		
	  //console.log(error.code)
	  //console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
	  console.log('Signout Succesfull')
   }, function(error) {
	  console.log('Signout Failed')  
   });
}



$(document).on('click', '.ingredient', function() {
    var selectedIngredient = $(this).text();
    $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p>`);
    selectedIngredientList.push(selectedIngredient);
    console.log(selectedIngredientList);
});

var getRecipe = function(){
    return $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + selectedIngredientList.join(",") + '&limitLicense=false&number=5&ranking=1', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) { console.log((data)); },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "DrNwVlaI6BmshQBWAGcWVKEwd2Nop1lT1sHjsnhKbHXzD5wrkP"); // Enter here your Mashape key
        }
    });
};


$('#search-btn').on('click', function(){

    getRecipe();
});


// var output = $.ajax({
//     url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + selectedIngredientList.join(",") + '&limitLicense=false&number=5&ranking=1', // The URL to the API. You can get this in the API page of the API you intend to consume
//     type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
//     data: {}, // Additional parameters here
//     dataType: 'json',
//     success: function(data) { console.dir((data.source)); },
//     error: function(err) { alert(err); },
//     beforeSend: function(xhr) {
//     xhr.setRequestHeader("X-Mashape-Authorization", "DrNwVlaI6BmshQBWAGcWVKEwd2Nop1lT1sHjsnhKbHXzD5wrkP"); // Enter here your Mashape key
//     }
// });
// console.log('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + selectedIngredientList.join(",") + '&limitLicense=false&number=5&ranking=1')

