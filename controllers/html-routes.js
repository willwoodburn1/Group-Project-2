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


    app.get("/view-recipe/:id", async function(req, res) {
        try {
            let logged_user_id;
            let rated_before = false;
            // Check if a user is logged in
            if (req.user) {
                logged_user_id = req.user.id
                    // Check if user has already rated the recipe
                rated_before = await db.Ratings.findOne({
                    where: {
                        recipe_id: req.params.id,
                        user_id: req.user.id
                    }
                })
                if (rated_before) {
                    rated_before = true
                }
            }
            // Query the database for the recipe with that ID
            let recipeData = await db.sequelize.query(`
                SELECT u.id AS 'user_id',
                u.username,
                r.id AS 'recipe_id',
                r.title,
                r.method,
                i.id AS 'ingredient_id',
                i.item,
                m.id AS 'measure_id',
                m.measure_metric
                FROM recipes r
                JOIN users u on u.id = r.UserId
                JOIN recipe_ingredients ri on r.id = ri.recipe_id
                JOIN ingredients i on i.id = ri.ingredient_id
                JOIN measures m on m.id = ri.measure_id
                WHERE r.id = ${req.params.id};
                `, { type: sequelize.QueryTypes.SELECT })

            res.render("view-recipe", {
                recipe: recipeData,
                recipe_id: recipeData[0].recipe_id,
                title: recipeData[0].title,
                method: recipeData[0].method,
                username: recipeData[0].username,
                logged_user_id: logged_user_id,
                rated_before: rated_before
            });
        } catch (error) {
            console.log(error);
        }
    })

    app.get("/view-recipe", function(req, res) {
        res.render("view-recipe");
    })

    app.post("/view-recipes/less-than", function(req, res) {
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