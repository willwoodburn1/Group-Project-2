module.exports = function(sequelize, DataTypes) {
    var Chef = sequelize.define("Chef", {
        name: DataTypes.STRING
    });

    Chef.associate = function(models) {
        Chef.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return Chef;

};
