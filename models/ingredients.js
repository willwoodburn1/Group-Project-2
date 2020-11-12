module.exports = function (sequelize, DataTypes) {

    var Ingredients = sequelize.define("Ingredients", {

        item: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        price: {
            type: DataTypes.DEC,
            allowNull: false,
            len: [1]
        }
    });

    Ingredients.associate = function (models) {
        Ingredients.belongsTo(models.Recipe, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Ingredients;




};