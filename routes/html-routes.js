// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

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
    })


    app.get("view-recipe/:id", function (req, res) {
        // Query the database for the recipe with that ID
        const recipe = getRecipe(req.params.id);

        // Pass through the recipe data into the view
        res.render("view-recipe", {
            recipe
        });

    app.get("/view-recipe", function(req, res) {
        res.render("view-recipe");
    })

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function (req, res) {
        res.render("members");
    });

};