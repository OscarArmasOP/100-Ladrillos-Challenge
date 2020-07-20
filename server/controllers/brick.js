const bricks = require('../models').bricks;


function create(req, res) {
    var body = req.body;

    bricks.create(body)
        .then(bricks => {
            res.status(200).send({ bricks });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al guardar los ladrillos" });
        })
}

function updateBricks(req, res) {
    var id = req.params.id;
    var body = req.body;
    //Find by ID
    bricks.findByPk(id)
        .then(brick => {
            //'Update' sequelize method
            brick.update(body)
                .then(() => {
                    res.status(200).send({ brick }); //Send the object to update
                })
                .catch(err => { //Update Error
                    res.status(500).send({ message: "ocurrio un error al actualizar los ladrillos" });
                })
        })
        .catch(err => { //Find Error
            res.status(500).send({ message: "Ocurrio un error al buscar los ladrillos" });
        })

}


function getBricks(req, res) {
    properties.findAll({
            where: {
                state: true,
            },
            order: [
                ['numero', 'ASC']
            ]
        })
        .then(bricks => {
            res.status(200).send({ bricks });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar los ladrillos" });
        })
}


module.exports = {
    create,
    updateBricks,
    getBricks,
}