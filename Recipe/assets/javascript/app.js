var ingredients;
var pantryList = [];
var IngredientList = [];
var selectedIngredientList = [];
var database = firebase.database();
var userRef = firebase.database().ref('/users');


/*===============================
=            TESTING            =
===============================*/
$(function() {
  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';
  $list = $('ul');
  $newItemForm = $('#newItemForm');
  $newItemButton = $('#newItemButton');

  $('li').hide().each(function(index) {
    $(this).delay(550 * index).fadeIn(1700);
  });
  // ITEM COUNTER
  function updateCount() {
    var items = $('li[class!=complete]').length;
    $('#counter').text(items);
  }
  updateCount();

  // SETUP FORM FOR NEW ITEMS
  $newItemButton.show();
  $newItemForm.hide();
  $('#showForm').on('click', function() {
    $newItemButton.hide();
    $newItemForm.show();
  });

  // ADDING A NEW LIST ITEM
  $newItemForm.on('submit', function(e) {
    e.preventDefault();
    var text = $('input:text').val();
    $list.append('<li>' + text + '</li>');
    $('input:text').val('');
    updateCount();
  });

  //CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('click', 'li', function() {
    var $this = $(this);
    var complete = $this.hasClass('complete');
    var selectedIngredient = $(this).text();
    $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p> <br>`);
    selectedIngredientList.push(selectedIngredient);
    console.log(selectedIngredientList);

    if (complete === true) {
      $this.animate({
        opacity: 0.0,
        paddingLeft: '+=180'
      }, 500, 'swing', function() {
        $this.remove();
      });
    } else {
      item = $this.text();
      $this.remove();
      $list
      // .append('<li class=\"complete\">' + item + '</li>')
      .hide().fadeIn(300);
      updateCount();
    }
  });

});




/*=====  End of TESTING  ======*/


// $('#submit-btn').on('click', function() {
//     ingredients = $('#ingredient-input').val().trim();
//      IngredientList.push(ingredients);
//      $('#ingredient-container').prepend(`<p><button class='btn btn-success ingredient'>${ingredients}</button></p>`);
//      $('#ingredient-input').val('');

//     console.log(IngredientList);
//     userRef.set({
//         id: "user",
//         ingredients:IngredientList
//     });

// })

// $(document).on('click', '.ingredient', function() {
//     var selectedIngredient = $(this).text();
//     $('#selected-ingredients-container').append(`<p class='selectedIngredient'>${selectedIngredient}</p>`);
//     selectedIngredientList.push(selectedIngredient);
//     console.log(selectedIngredientList);
// });

var getRecipe = function(){
    return $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + selectedIngredientList.join(",") + '&limitLicense=false&number=5&ranking=1', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) { 

            var results = data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var recipe = results[i].id;
                console.log(recipe);

                    $.ajax({
                        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipe + '/information?includeNutrition=false', // The URL to the API. You can get this in the API page of the API you intend to consume
                        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
                        data: {}, // Additional parameters here
                        dataType: 'json',
                        success: function(data) {
                            var img = data.image;
                            var name = data.title;
                            var time = data.readyInMinutes;
                            var steps = data.instructions.slice(0,400);
                            var more = data.sourceUrl;

                             console.log((data));
                            $('#result-container').append(`
                                <div class="recipes container">
                                  <div class="col-sm-3">
                                      <img src="${img}">
                                  </div>
                                  <div class="col-sm-9">
                                      <div class='recipe-name'> ${name}</div>
                                      <div class='sub-text'> Ready in: ${time} minutes </div>
                                      <br>
                                      <div class='text'> Directions : ${steps} ... <a href="${more}"> Read More... </a></div>
                                      <button id="GoogleCalendar-btn"> Add to Calendar </button>
                                  </div>
                                </div>
                            `);


                        },
                        error: function(err) { alert(err); },
                        beforeSend: function(xhr) {
                        xhr.setRequestHeader("X-Mashape-Authorization", "DrNwVlaI6BmshQBWAGcWVKEwd2Nop1lT1sHjsnhKbHXzD5wrkP"); // Enter here your Mashape key
                        }
                    });

            };

         },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "DrNwVlaI6BmshQBWAGcWVKEwd2Nop1lT1sHjsnhKbHXzD5wrkP"); // Enter here your Mashape key
        }
    });
};


$('#search-btn').on('click', function(){
    $('result-container').empty();
    getRecipe();

});

;

