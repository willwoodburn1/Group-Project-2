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