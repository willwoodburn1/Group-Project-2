// Requiring our models
var db = require("../models");
const sequelize = require("sequelize");

module.exports = function(app) {
    // get recipe and ingredients list with the recipe_id
    app.get("/api/recipesIngredients/:recipe_id", function(req, res) {
        db.sequelize.query(`
        SELECT * FROM recipe_ingredients
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

    app.post("/api/recipesIngredients", function(req, res) {
        db.sequelize.query(`
        INSERT INTO recipe_ingredients (quantity, createdAt, updatedAt, recipe_id, ingredient_id, measure_id) VALUES (${req.body.quantity},NOW(), NOW(), ${req.body.recipe_id}, ${req.body.ingredient_id}, ${req.body.measure_id});`, {
            type: sequelize.QueryTypes.INSERT
        }).then(function(data) {
            res.json(data);
        })
    });

    app.put("/api/recipesIngredients/:id", function(req, res) {
        db.sequelize.query(`
        UPDATE recipe_ingredients
        SET 
            quantity = ${req.body.quantity}, 
            ingredient_id = ${req.body.ingredient_id},
            measure_id = ${req.body.measure_id}
        WHERE recipe_id = ${req.params.id};`, {
            type: sequelize.QueryTypes.UPDATE
        }).then(function(data) {
            res.json(data)
        })
    })

    app.delete("/api/recipesIngredients/:id", function(req, res) {
        db.sequelize.query(`
        DELETE FROM recipe_ingredients
        WHERE recipe_id = ${req.params.id};`, {
            type: sequelize.QueryTypes.DELETE
        }).then(function(data) {
            res.json(data);
        })
    })
}