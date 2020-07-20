module.exports = (sequelize, DataTypes) => {

    const properties = sequelize.define('property', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.BOOLEAN
        },
        location: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

    // Foreign key Association
    /*
        properties.associate = function (models) {
            models.properties.hasMany(models.bricks, {
                foreignKey: 'id_properties'
            });
        };
    */
    return properties;
};