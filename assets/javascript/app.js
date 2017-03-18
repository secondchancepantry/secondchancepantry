var ingredients;
var pantryList = [];
var selectedIngredientList = [];
var database = firebase.database();
var userRef = firebase.database().ref('/users');

$('#submit-btn').on('click', function() {
    ingredients = $('#ingredient-input').val().trim();
     selectedIngredientList.push(ingredients);
     $('#ingredient-container').prepend(`<p><button class='btn btn-success ingredient'>${ingredients}</button></p>`);
     $('#ingredient-input').val('');

    console.log(selectedIngredientList);
    userRef.set({
        id: "user",
        ingredients:selectedIngredientList
    });

})



$(document).on('click', '.ingredient', function() {
    var selectedIngredient = $(this).text();
    $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p>`);

});
