// Requiring our models
var db = require("../models");

module.exports = function(app) {



    // get measures
    app.get("api/measure/:id", function(req, res) {
        db.Measure.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })



}