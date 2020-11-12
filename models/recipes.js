module.exports = function (sequelize, DataTypes) {
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

    Recipe.associate = function (models) {
        Recipe.belongsToMany(models.Ingrediants, {
            through: "recipe_ingrediants",
            as: "recipe",
            foreignKey: recipe_id
        });
    };

    return Recipe;

};