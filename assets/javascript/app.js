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
