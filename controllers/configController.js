'use strict'

var config = require('../models/config')

var createDb = async function(req, res){
    try {
        var reg = await config.create({})

        if(reg){
            return true
        }
        
        return false

    } catch (error) {
        console.log(error)
        return false
    }
}

var createGender = async function(req, res){
    try {
        var data = req.body
        var db = await config.find({})
        var control = true

        if(db.length == 0){
            control = await createDb()
            if(control){
                db = await config.find({})
            }
        }

        if(control){
            var genres = db[0].genres
            genres.push(data)
            
            var reg = await config.updateOne({_id: db[0]._id}, {genres: genres})

            if(reg){
                return res.status(200).send({message: 'Se guardo el nuevo genero correctamente', ok: true})
            }
            
            return res.status(500).send({error: 'Error en el servidor, no se guardo el nuevo genero', ok: false})

        }
        
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var listGenres = async function(req, res){
    try {
        var data = await config.find({})

        if(data.length == 0){
            var reg = await createDb()

            if(reg){
                return res.status(404).send({error: 'No se encontraron generos', ok: false})
            }
            
            return res.status(500).send({error: 'Error en el servidor', ok: false})
        }

        var genres = data[0].genres
        if(genres.length == 0){
            return res.status(404).send({error: 'No se encontraron generos', ok: false})
        }

        return res.status(200).send({genres, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var deleteGender = async function(req, res){
    try {
        var data = req.params.gen
        var db = await config.find({})

        if(db.length == 0){
            var reg = await createDb()

            if(reg){
                return res.status(404).send({error: 'No se encontro el genero', ok: false})
            }

            return res.status(500).send({error: 'Error en el servidor', ok: false})
        }

        var genres = db[0].genres

        genres = genres.filter(gender => gender.value != data)

        var reg = await config.updateOne({_id: db[0]._id}, {genres: genres})

        if(!reg){
            return res.status(500).send({error: 'Error en el servidor', ok: false})
        }

        return res.status(200).send({message: 'Genero eliminado con exito', ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var switchMaintance = async function(req, res){
    try {
        var data = req.body.maintance
        var db = await config.find({})

        if(db.length == 0){
            var reg = await createDb()

            if(reg){
                return res.status(500).send({error: 'Error en el servidor', ok: false})
            }

            return res.status(500).send({error: 'Error en el servidor, porfavor contactar a soporte', ok: false})
        }

        var reg = await config.updateOne({_id: db[0]._id}, {maintance: data})

        if(!reg){
            return res.status(500).send({error: 'Error en el servidor', ok: false})
        }

        return res.status(200).send({message: 'Mantenimiento cambiado con exito', ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var getMaintance = async function(req, res){
    try {
        var db = await config.find({})

        if(db.length == 0){
            var reg = await createDb()

            if(reg){
                return res.status(500).send({error: 'Error en el servidor', ok: false})
            }

            return res.status(500).send({error: 'Error en el servidor, porfavor contactar a soporte', ok: false})
        }

        var maintance = db[0].maintance
        return res.status(200).send({maintance, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var getConfig = async function(req, res) {
    try {
        var data = await config.find({})

        if(data.length == 0){
            var reg = await createDb()

            if(reg){
                return res.status(404).send({error: 'No se encontraron configuraciones', ok: false})
            }
            
            return res.status(500).send({error: 'Error en el servidor', ok: false})
        }

        var confi = data[0]
        return res.status(200).send({confi, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

module.exports = {
    createGender,
    listGenres,
    deleteGender,
    switchMaintance,
    getMaintance,
    getConfig
}