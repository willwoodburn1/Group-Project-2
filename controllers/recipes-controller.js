// Requiring our models
var db = require("../models");

module.exports = function(app) {

    // get recipe
    app.get("api/recipes/:id", function(req, res) {
        db.Recipe.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })

}