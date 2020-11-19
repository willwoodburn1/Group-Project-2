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
        },
        image: {
            type: DataTypes.STRING
        }
    });

    Recipe.associate = function(models) {
        Recipe.hasOne(models.Recipe_Ingredients, {
            foreignKey: "recipe_id"
        })
    };

    return Recipe;

};