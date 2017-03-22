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
var oauth_scope = "https://www.googleapis.com/auth/calendar"

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


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  user = profile;
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('Access Token: ' + JSON.stringify(profile));
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

$('#update-calendar').on('click', function(){

});

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

