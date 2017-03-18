var ingredients;
var pantryList = [];
var IngredientList = [];
var selectedIngredientList = [];
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

$(document).on('click', '.ingredient', function() {
    var selectedIngredient = $(this).text();
    $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p>`);
    selectedIngredientList.push(selectedIngredient);
    console.log(selectedIngredientList);
});

var output = $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + '%2C' + selectedIngredientList[0] + '%2C' + selectedIngredientList[1] + '%2C' + selectedIngredientList[2] + '&limitLicense=false&number=5&ranking=1', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) { console.dir((data.source)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "DrNwVlaI6BmshQBWAGcWVKEwd2Nop1lT1sHjsnhKbHXzD5wrkP"); // Enter here your Mashape key
    }
});

console.log(output);