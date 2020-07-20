const user = require('../routes/user');

const users = require('../models').users;

function create(req, res) {
    //"Crate" sequelize method
    users.create(req.body)
        .then(user => {
            res.status(200).send({ user });
        })
        .catch(err => {
            res.status(500).send({ err });
        })
}

function login(req, res) {
    //"FindOne" sequelize method
    users.findOne({
            where: {
                user: req.body.user,
                password: req.body.password
            }
        })
        .then(user => {
            res.status(200).send({ user });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar el usuario" });
        })
}

function getAll(req, res) {
    //"All" sequelize method
    users.findAll()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los usuarios" });
        })
}

module.exports = {
    create,
    login,
    getAll
}