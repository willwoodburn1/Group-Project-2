
module.exports = function (sequelize, DataTypes) {

    var recipe_ingredients = sequelize.define("recipe_ingredients", {

        recipe_id: {
            type: DataTypes.INTEGER,
            references: "recipes",
            referencesKey: "id"
        },

        ingrediant_id:{
            type: DataTypes.INTEGER,
            references: "ingrediants",
            referencesKey: "id"
        }
    });


    return recipe_ingredients;

};