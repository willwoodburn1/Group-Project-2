// Requiring our models
var db = require("../models");

module.exports = function (app) {
    // get recipe and ingredients list with the recipe_id
    app.get("api/recipesIngredients/:id", function (req, res) {
        db.recipes_ingredients.findAll({
            where: {
                recipes_id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    // get all the recipes and ingredients
    app.get("/api/recipesIngredients", function (req, res) {
        db.recipes_ingredients.findAll().then(function (data) {
            res.json(data);
        })
    });

    app.post("/api/recipesIngredients", function (req, res) {
        db.recipes_ingredients.create(req.body).then(function (data) {
            res.json(data);
        })
    });

    app.delete("/api/ingredients/:id", function (req, res) {
        db.recipes_ingredients.destroy({
            where: {
                recipes_id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })
}