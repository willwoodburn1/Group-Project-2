// Requiring our models
var db = require("../models");

module.exports = function(app) {
    // get recipe and ingredients list with the recipe_id
    app.get("api/recipesIngredients/:id", function(req, res) {
        db.recipes_ingredients.findAll({
            where: {
                recipes_id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })
}