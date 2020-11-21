// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = function(app) {
    app.get("/", function(req, res) {
        db.Recipe.findAll().then(function(data) {
            res.render("index", { recipes: data });
        })
    });

    app.get("/signup", function(req, res) {
        res.render("signup");
    })

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.render("login");
    });

    app.get("logout", function(req, res) {
        res.render("index");
    })

    app.get("/create-recipe", isAuthenticated, function(req, res) {
        res.render("create-recipe");
    });


    app.get("/view-recipe/:id", function(req, res) {
        // Query the database for the recipe with that ID
        db.sequelize.query(`
        SELECT 
            recipes.id as recipe_id, 
            recipes.title,
            recipes.method,
            recipes.image,
            recipes.UserId,
            recipe_ingredients.quantity as ingredient_quantity,
            measures.measure_metric as measure_name,
            ingredients.item as ingredient_name,
            ingredients.price as ingredient_price
        FROM recipes

        JOIN 
            recipe_ingredients ON (recipes.id = recipe_ingredients.recipe_id)
        JOIN
            measures ON (recipe_ingredients.measure_id = measures.id)
        JOIN
            ingredients ON (recipe_ingredients.ingredient_id = ingredients.id)
        WHERE recipes.id = ${req.params.id};`, { 
            type: sequelize.QueryTypes.SELECT 
        }).then(function(data) {
            console.log(data)
            res.render("view-recipe", {
                recipe: data,
                // title: data[0].title,
                // method: data[0].method,
                // username: data[0].username
            });
        })
    })

    // SELECT u.id AS 'user_id',
    //     u.username,
    //     r.id AS 'recipe_id',
    //     r.title,
    //     r.method,
    //     i.id AS 'ingredient_id',
    //     i.item,
    //     m.id AS 'measure_id',
    //     m.measure_metric
    //     FROM recipes r
    //     JOIN users u on u.id = r.UserId
    //     JOIN recipe_ingredients ri on r.id = ri.recipe_id
    //     JOIN ingredients i on i.id = ri.ingredient_id
    //     JOIN measures m on m.id = ri.measure_id
    //     WHERE r.id = ${req.params.id};

    app.get("/view-recipe", function(req, res) {
        res.render("view-recipe");
    })

    app.post("/view-recipes/less-than", function(req, res) {
        console.log(req.body);
        let price = req.body.price;
        db.sequelize.query(`
        SELECT r.id, r.title, FORMAT(SUM(i.price), 2) AS "cost"
        FROM recipes r 
        JOIN recipe_ingredients ri on r.id = ri.recipe_id 
        JOIN ingredients i on i.id = ri.ingredient_id
        GROUP BY r.title
        HAVING SUM(i.price)<${price};
        `, { type: sequelize.QueryTypes.SELECT })
            .then(function(data) {
                res.render("search-results", { recipes: data });
            })

    })

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        let userId = req.user.id;
        db.sequelize.query(`
        SELECT recipes.title, recipes.id 
        FROM recipes 
        JOIN users ON recipes.UserId = users.id 
        WHERE users.id = ${userId};
        `, { type: sequelize.QueryTypes.SELECT }).then(function(data) {
            console.log(data);
            res.render("members", { recipes: data });
        })
    });
}