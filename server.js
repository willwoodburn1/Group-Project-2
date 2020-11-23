var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport");
var mysql = require("mysql");

var connection;
if (process.env.JAWSDB_URL) {
    // Database is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Database is local
    connection = mysql.createConnection({
        port: 3306,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
};


var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./controllers/passport-controller")(app);
require("./controllers/html-routes")(app);
require("./controllers/users-controller")(app);
require("./controllers/ingredients-controller")(app);
require("./controllers/recipes-controller")(app);
require("./controllers/recipe-ingredients-controller")(app);
require("./controllers/rate-recipe-controller")(app);
require("./controllers/comments-controller")(app);
require("./controllers/favourites-controller")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on http://localhost:" + PORT);
    });
});