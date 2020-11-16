// Code goes here for view-recipe.handlebars for the user to view the selected recipe
$(document).ready(function () {
    var recipeForm = $("#recipeForm");
    var recipeName = $("#recipe-name");
    var recipeMethod = $("#recipe-method");
    var recipeItem = $("#recipe-item");
    var recipeUnit = $("#recipe-unit");


    

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        recipeForm.empty();
        var recipesToAdd = [];
        for (var i = 0; i < recipes.length; i++) {
            recipesToAdd.push(createNewRow(recipes[i]));
        }
        recipeForm.append(recipesToAdd);
    }


    // view-recipe.handlebars should display
    // Recipe Title
    // Chef's name
    // List of ingredients
    // Method
    // Images
    // Option to save recipe (bonus)
    // Option to leave comment (bonus)
    // Option to rate recipe (bonus)

    // Make ajax get call to retrieve the following
    // recipe title
    // chef's name
    // ingredients list
    // method
    // images
    // Do this by using the recipe_id and using the RecipeIngredients database table
    // eg.
    //  for each row in the data
    //  get the chef, recipe, ingredients, measures and amounts
    //  make more ajax calls each to get the chef, recipe, ingredient, measure and amount



    // write code to get elements and replace with proper data



});