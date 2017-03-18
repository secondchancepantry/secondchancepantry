var ingredients;

$('#submit-btn').on('click', function() {
    ingredients = $('#ingredient-input').val().trim();
    console.log(ingredients);
     $('#ingredient-container').prepend(`<p><button class='btn btn-success ingredient'>${ingredients}</button></p>`);
     $('#ingredient-input').val('');
})

$(document).on('click', '.ingredient', function() {
    var selectedIngredient = $(this).text();
    // console.log(selectedIngredient);
    $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p>`);

});
