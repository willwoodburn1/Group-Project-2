// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/search-by-name", function (req, res) {
        res.render("search-by-name");
    })

    app.get("/signup", function (req, res) {
        res.render("signup");
    })

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.render("login");
    });

    app.get("logout", function (req, res) {
        res.render("index");
    })

    app.get("/create-recipe", isAuthenticated, function (req, res) {
        res.render("create-recipe");
    });


    app.get("/view-recipe/:id", async function (req, res) {
        try {
            let recipe_id = req.params.id;
            let logged_user_id;
            let rated_before = false;
            // Check if a user is logged in
            if (req.user) {
                logged_user_id = req.user.id
                // Check if user has already rated the recipe
                rated_before = await db.Ratings.findOne({
                    where: {
                        recipe_id: recipe_id,
                        user_id: req.user.id
                    }
                })
                if (rated_before) {
                    rated_before = true
                }
            }

            let chef = await db.sequelize.query(`
                SELECT users.username 
                FROM recipes
                JOIN users ON users.id = recipes.userId
                WHERE recipes.id = ${recipe_id};
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            let recipe = await db.sequelize.query(`
                SELECT id, title, method, image FROM recipes WHERE recipes.id = ${recipe_id};
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            let ingredientsData = await db.sequelize.query(`
                SELECT recipe_ingredients.quantity, ingredients.item, ingredients.price, measures.measure_metric
                FROM recipe_ingredients
                JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id
                JOIN measures ON measures.id = recipe_ingredients.measure_id
                WHERE recipe_id = ${recipe_id};
            `, {
                type: sequelize.QueryTypes.SELECT
            })

            let recipePrice = await db.sequelize.query(`
                SELECT recipe_ingredients.recipe_id, FORMAT(SUM(ingredients.price), 2) AS 'price'
                FROM recipe_ingredients
                JOIN ingredients ON ingredients.id = recipe_ingredients.ingredient_id
                WHERE recipe_ingredients.recipe_id = ${recipe_id}
            `, {
                type: sequelize.QueryTypes.SELECT
            })

            let averageRating = await db.sequelize.query(`
                SELECT recipes.title AS 'title', FORMAT(AVG(ratings.rating), 1) AS 'rating'
                FROM recipes
                JOIN ratings ON ratings.recipe_id = recipes.id
                WHERE recipes.id = ${recipe_id};
                `, {
                type: sequelize.QueryTypes.SELECT
            });

            if (averageRating[0].title === undefined) {
                averageRating = null;
            }

            if (req.user) {
                var favouritesData = await db.sequelize.query(`
                SELECT * 
                FROM favourites
                WHERE recipe_id = ${recipe_id}
                AND user_id = ${logged_user_id}
                `, { type: sequelize.QueryTypes.SELECT });
            }

            let commentsData = await db.sequelize.query(`
                SELECT comments.comment, users.username, ratings.rating
                FROM comments
                JOIN users ON users.id=comments.user_id
                LEFT JOIN ratings ON ratings.recipe_id=comments.recipe_id AND ratings.user_id=comments.user_id
                WHERE comments.recipe_id=${recipe_id};
            `, { type: sequelize.QueryTypes.SELECT });

            console.log(recipe);

            res.render("view-recipe", {
                recipe: recipe,
                recipePrice: recipePrice,
                chef: chef,
                ingredientsData: ingredientsData,
                comments: commentsData,
                logged_user_id: logged_user_id,
                rated_before: rated_before,
                favouritesData: favouritesData,
                averageRating: averageRating
            });
        } catch (error) {
            console.log(error);
        }
    })

    app.get("/view-recipe", function (req, res) {
        res.render("view-recipe");
    })

    // When user enters a dollar amount in the search box
    // The recipes worth less than the inputted amount are search for here
    app.post("/view-recipes/less-than", async function (req, res) {
        try {
            let price = req.body.price;
            let recipesData = await db.sequelize.query(`
                SELECT r.id, r.title, r.image, FORMAT(SUM(i.price), 2) AS "cost"
                FROM recipes r 
                JOIN recipe_ingredients ri on r.id = ri.recipe_id 
                JOIN ingredients i on i.id = ri.ingredient_id
                GROUP BY r.title
                HAVING SUM(i.price) < ${price};
                `, { type: sequelize.QueryTypes.SELECT })

            console.log(recipesData)

            for (let i = 0; i < recipesData.length; i++) {
                let rating = await db.sequelize.query(`
                    SELECT recipes.id, recipes.title, FORMAT(AVG(ratings.rating), 2) AS 'rating'
                    FROM ratings
                    JOIN recipes ON recipes.id = ratings.recipe_id
                    WHERE recipes.id = ${recipesData[i].id}
                `, { type: sequelize.QueryTypes.SELECT })
                recipesData[i].rating = rating[0].rating
            }

            console.log(recipesData)

            let recipesObj = { pair: recipesData }
            console.log(recipesObj)
            res.render("search-results", {
                recipesData: recipesObj,
            });


        } catch (error) {
            console.log(error);
        }
    })

    // edit recipe page
    app.get("/edit-recipe/:recipe_id", isAuthenticated, (req, res) => {
        db.sequelize.query(`
            SELECT 
                recipes.id as recipe_id, 
                recipes.title,
                recipes.method,
                recipes.image,
                users.username as chef,
                recipe_ingredients.quantity as ingredient_quantity,
                measures.measure_metric as ingredient_measure,
                ingredients.id as ingredient_id,
                ingredients.item as ingredient_name,
                ingredients.price as ingredient_price
            FROM recipes

            JOIN recipe_ingredients ON (recipes.id = recipe_ingredients.recipe_id)
            JOIN measures ON (recipe_ingredients.measure_id = measures.id)
            JOIN ingredients ON (recipe_ingredients.ingredient_id = ingredients.id)
            JOIN users ON (recipes.UserId = users.id)

            WHERE recipes.id = ${req.params.recipe_id};`, {
            type: sequelize.QueryTypes.SELECT
        }).then(data => {
            res.render("edit-recipe", { recipe: data })
        });
    });

    app.post("/search-recipes-by-title", async function (req, res) {

        try {
            let title = req.body.title.toLowerCase().trim();
            let recipesData = await db.sequelize.query(`
            SELECT r.id, r.title, r.image, FORMAT(SUM(i.price), 2) AS "cost", FORMAT(AVG(ra.rating), 1) AS 'rating'
            FROM recipes r 
            JOIN recipe_ingredients ri on r.id = ri.recipe_id 
            JOIN ingredients i on i.id = ri.ingredient_id
            LEFT JOIN ratings ra on ra.recipe_id=r.id
            WHERE r.title LIKE '%${title}%'
            GROUP BY r.title;
            `, {
                type: sequelize.QueryTypes.SELECT
            });
            let recipesObj = { pair: recipesData };
            if (recipesData.length === 0) {
                res.render("index", { noData: true });
            } else {
                res.render("search-results", { recipesData: recipesObj });
            }

        } catch (error) {
            console.log(error);
        }
    })

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, async function (req, res) {
        try {
            let userId = req.user.id;
            let recipesData = await db.sequelize.query(`
                SELECT recipes.title, recipes.id 
                FROM recipes 
                JOIN users ON recipes.UserId = users.id 
                WHERE users.id = ${userId};
                `, { type: sequelize.QueryTypes.SELECT })

            let savedRecipes = await db.sequelize.query(`
                SELECT recipes.title, favourites.recipe_id
                FROM favourites
                JOIN recipes ON recipes.id=favourites.recipe_id
                WHERE user_id=${userId};
                `, { type: sequelize.QueryTypes.SELECT })

            res.render("members", {
                recipes: recipesData,
                savedRecipes: savedRecipes
            });

        } catch (error) {
            console.log(error);
        }

    });
}