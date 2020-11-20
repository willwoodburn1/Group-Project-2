// Requiring our models
var db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {
    // get recipe and ingredients list with the recipe_id
    app.get("/api/recipesIngredients/:recipe_id", function(req, res) {
        db.sequelize.query(`
        SELECT recipe_ingredients.ingredient_id, recipe_ingredients.recipe_id, recipe_ingredients.createdAt, recipe_ingredients.updatedAt
            FROM recipe_ingredients
        WHERE recipe_id = ${req.params.recipe_id};`, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            res.json(data);
        })
    })

    // get recipe id and ingredient id
    app.get("/api/recipesIngredients", function(req, res) {
        db.sequelize.query(`
        SELECT * FROM recipe_ingredients;`, {
            type: sequelize.QueryTypes.SELECT
        }).then(function(data) {
            res.json(data);
        })
    })

    // get all the recipes and ingredients
    // app.get("/api/recipesIngredients", function (req, res) {
    //     db.recipe_ingredients.findAll().then(function (data) {
    //         res.json(data);
    //     })
    // });

    app.post("/api/recipesIngredients", function(req, res) {
        db.sequelize.query(`
        INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, recipe_id, ingredient_id, measure_id) VALUES (${req.body.quantity},NOW(), NOW(), ${req.body.recipe_id}, ${req.body.ingredient_id}, ${req.body.measure_id});`, {
            type: sequelize.QueryTypes.INSERT
        }).then(function(data) {
            res.json(data);
        })
    });

    app.delete("/api/recipesIngredients/:id", function(req, res) {
        db.recipe_ingredients.destroy({
            where: {
                recipes_id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })
}