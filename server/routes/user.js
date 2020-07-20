const userController = require('../controllers').users;

module.exports = (app) => {
    app.post('/api/user', userController.create);
    app.post('/api/login', userController.login);
    app.get('/api/users', usuariosController.getAll);
}