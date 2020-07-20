module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
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

    return users;
}