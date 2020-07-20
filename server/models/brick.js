module.exports = (sequelize, DataTypes) => {

    const brick = sequelize.define('brick', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.DOUBLE
        },
        price: {
            type: DataTypes.DOUBLE
        },
        state: {
            type: DataTypes.BOOLEAN
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

    /*
    bricks.belongsTo(properties, {
        foreignKey: 'id_property',
        constraints: false
    });
*/
    return brick;
}