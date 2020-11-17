const sequelize = require("sequelize");
const { Op } = require('sequelize')

// Requiring our models
var db = require("../models");

module.exports = function(app) {

    // get all the recipes
    app.get("/api/recipes", function(req, res) {
        db.Recipe.findAll().then(function(data) {
            res.json(data);
        })
    })

    // get a recipe using the recipe id
    app.get("api/recipes/:id", function(req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/recipes/less-than/:price", function(req, res) {
        console.log(db.Ingredients);
        db.Recipe.findAll({
            include: [{
                model: db.Ingredients,
                through: "recipe_ingredients",
                as: "ingredients",
                required: true
            }],
            attributes: ['recipe.title', [sequelize.fn('sum', sequelize.col('ingredients.price')), 'test'], ],
            group: ["recipe.title"],
            // where: {
            //     sequelize.where(sequelize.fn('sum', sequelize.col('ingredients.price')), 2)
            // },
            having: {
                'ingredients.price': sequelize.where(sequelize.fn('sum', sequelize.col('ingredients.price')), {
                    [Op.lt]: req.params.price
                })
            }
        }).then(function(recipes) {
            console.log(recipes);
        })
    })

    app.post("api/recipes", function(req, res) {
        db.Recipe.create(req.body).then(function(recipe) {
            res.json(recipe);
        })
    });

    app.delete("/api/recipes/:id", function(req, res) {
        db.Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data)
        })
    })

}