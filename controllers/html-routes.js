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
                SELECT 
                    recipes.id as recipe_id, 
                    recipes.title,
                    recipes.method,
                    recipes.image,
                    recipes.UserId as user_id,
                    users.username as chef,
                    recipe_ingredients.quantity as ingredient_quantity,
                    measures.measure_metric as ingredient_measure,
                    ingredients.item as ingredient_name,
                    ingredients.price as ingredient_price
                FROM recipes

                JOIN 
                    recipe_ingredients ON (recipes.id = recipe_ingredients.recipe_id)
                JOIN
                    measures ON (recipe_ingredients.measure_id = measures.id)
                JOIN
                    ingredients ON (recipe_ingredients.ingredient_id = ingredients.id)
                JOIN
                    users ON (recipes.UserId = users.id)
                WHERE recipes.id = ${req.params.id};`, {
                type: sequelize.QueryTypes.SELECT
            })

            res.render("view-recipe", {
                recipe: recipeData,
                // recipe_id: recipeData[0].recipe_id,
                // title: recipeData[0].title,
                // method: recipeData[0].method,
                // username: recipeData[0].username,
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

    // When user enters a dollar amount in the search box
    // The recipes worth less than the inputted amount are search for here
    app.post("/view-recipes/less-than", async function(req, res) {
        try {
            let price = req.body.price;
            let recipeResults = await db.sequelize.query(`
                SELECT r.id, r.title, FORMAT(SUM(i.price), 2) AS "cost", FORMAT(AVG(coalesce(ra.rating, 0)), 1) AS 'rating'
                FROM recipes r 
                JOIN recipe_ingredients ri on r.id = ri.recipe_id 
                JOIN ingredients i on i.id = ri.ingredient_id
                JOIN ratings ra on ra.recipe_id=r.id
                GROUP BY r.title
                HAVING SUM(i.price)<${price};
                `, { type: sequelize.QueryTypes.SELECT })

            res.render("search-results", { recipes: recipeResults });

        } catch (error) {
            console.log(error);
        }
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