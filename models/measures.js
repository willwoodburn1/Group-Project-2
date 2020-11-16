module.exports = function (sequelize, DataTypes) {
    var Measure = sequelize.define("Measure", {
        measure_metric: {
            type: DataTypes.STRING,
        }
    });

    Measure.associate = function (models) {
        Measure.belongsToMany(models.Ingredients, {
            through: "recipe_ingredients",
            as: "measure",
            foreignKey: "measure_id"
        });
    };

    return Measure;

};