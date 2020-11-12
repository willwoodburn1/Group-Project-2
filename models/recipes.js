module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        method: {
            type: DataTypes.TEXT,
        }
    });

    Recipe.associate = function(models) {
        Recipe.belongsToMany(models.Ingredients, {
            through: "recipe_ingredients",
            as: "recipe",
            foreignKey: recipe_id
        });
    };

    return Recipe;

};