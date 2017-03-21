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

