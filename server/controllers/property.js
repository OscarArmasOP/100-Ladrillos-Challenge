const properties = require('../models').properties;
const fs = require('fs');
const thumb = require('node-thumbnail').thumb;
const path = require('path');



function create(req, res) {
    var body = req.body;

    properties.create(body)
        .then(properties => {
            res.status(200).send({ properties });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al guardar la propiedad" });
        })
}

function update(req, res) {
    var id = req.params.id;
    var body = req.body;
    //Find by ID
    properties.findByPk(id)
        .then(property => {
            //'Update' sequelize method
            property.update(body)
                .then(() => {
                    res.status(200).send({ property }); //Send the object to update
                })
                .catch(err => { //Update Error
                    res.status(500).send({ message: "ocurrio un error al actualizar la propiedad" });
                })
        })
        .catch(err => { //Find Error
            res.status(500).send({ message: "Ocurrio un error al buscar la propiedad" });
        })

}

function uploadImg(req, res) {

    var id = req.params.id;

    if (req.files) {
        //File route
        var file_path = req.files.foto.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'jpg') {
            //Save the file into the DB
            var foto = {};
            foto.imagen = file_name;

            properties.findByPk(id)
                .then(property => {
                    property.update(foto)
                        .then(() => {

                            var newPath = './server/uploads/propierties/' + file_name;
                            var thumbPath = './server/uploads/propierties/thumbs';

                            thumb({
                                source: path.resolve(newPath),
                                destination: path.resolve(thumbPath),
                                width: 200,
                                suffix: ''
                            }).then(() => {
                                res.status(200).send({ property });
                            }).catch(err => {
                                res.status(500).send({ message: "Ocurrio un error al crear el thumbnail." });
                            });


                        })
                        .catch(err => {
                            fs.unlink(file_path, (err) => {
                                if (err) {
                                    res.status(500).send({ message: "Ocurrio un error al eliminar el archivo." });
                                }
                            })
                            res.status(500).send({ message: "Ocurrio un error al actualizar la foto." });
                        })
                })
                .catch(err => {
                    fs.unlink(file_path, (err) => {
                        if (err) {
                            res.status(500).send({ message: "Ocurrio un error al eliminar el archivo." });
                        }
                    })
                    res.status(500).send({ message: "Ocurrio un error al buscar la foto." });
                })
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    res.status(500).send({ message: "Ocurrio un error al eliminar el archivo." });
                }
            })
            res.status(500).send({ message: "La extension no es valida." });
        }
    } else {
        res.status(400).send({ message: "Debes de seleccionar " });
    }
}

function getProperty(req, res) {

    var property = req.params.property;
    var thumb = req.params.thumb;
    if (!thumb) {
        var path_foto = './server/uploads/properties/' + property; //Route
    } else {
        var path_foto = './server/uploads/properties/thumbs/' + property; //Route
    }
    //Exists in the server
    fs.exists(path_foto, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_foto));
        } else {
            res.status(404).send({ message: "No se encuentra la propiedad." });
        }
    })
}

//Listar todas la propiedades
function getAll(req, res) {
    properties.findAll({
            where: {
                state: true,
            },
            order: [
                ['numero', 'ASC']
            ]
        })
        .then(properties => {
            res.status(200).send({ properties });
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al buscar las propiedades" });
        })
}
module.exports = {
    create,
    update,
    uploadImg,
    getProperty,
    getAll
}