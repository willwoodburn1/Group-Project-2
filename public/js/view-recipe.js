// Code goes here for view-recipe.handlebars for the user to view the selected recipe

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
// function getRecipeIngredients() {
//      $.get("api/recipesIngredients", function(data) {
//          for each row in the data
//          get the chef, recipe, ingredients, measures and amounts
//          make more ajax calls each to get the chef, recipe, ingredient, measure and amount
//      })
// }
// 
// In api-routes.js
// app.get("api/recipesIngredients/:id", function(req, res) {
//      db.recipesIngredients.findAll({
//          where: {
//              recipes_id: req.params.id
//          }
//      }).then(function(data) {
//          res.json(data);
//      })
// })