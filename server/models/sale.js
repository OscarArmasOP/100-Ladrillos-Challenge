module.exports = (sequelize, DataTypes) => {

    const venta = sequelize.define('sale', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        subtotal: {
            type: DataTypes.DOUBLE
        },
        IVA: {
            type: DataTypes.DOUBLE
        },
        total: {
            type: DataTypes.DOUBLE
        },
        createdAt: {
            type: DataTypes.DATE
        },
    });

    return venta;
}