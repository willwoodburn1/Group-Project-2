// Requiring our models and passport as we've configured it
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

    // get chef
    app.get("api/chef/:id", function (req, res) {
        db.chef.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    // get recipe
    app.get("api/recipes/:id", function (req, res) {
        db.recipes.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    // get measures
    app.get("api/measure/:id", function (req, res) {
        db.measure.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })



}