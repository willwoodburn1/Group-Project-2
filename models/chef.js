module.exports = function(sequelize, DataTypes) {
    var Chef = sequelize.define("Chef", {
        name: DataTypes.STRING
    });

    Chef.associate = function(models) {
        Chef.hasMany(models.Recipe, {
            onDelete: "cascade"
        });
    };

    return Chef;

};
