'use strict'

var news = require('../models/new')
var fs = require('fs')
var path = require('path')

var listNews = async function(req, res){
    try {
        var data = await news.find({})

        if(!data){
            return res.status(404).send({error: 'No se encuentran noticias o existe error en el servidor', ok: false})
        }
        
        return res.status(200).send({data, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var listNew = async function(req, res){
    try {
        var id = req.params.id
        var data = await news.find({_id: id})

        if(!data){
            return res.status(404).send({error: 'No se encuentra la noticia o existe error en el servidor', ok: false})
        }
        
        return res.status(200).send({data, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var create = async function(req, res){
    try {
        var data = req.body
        const file = req.file
        data.portada = file.filename

        const reg = await news.create(data)

        if(reg){
            return res.status(200).send({ok: true, message: 'Noticia agregada con exito'})
        }

        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${file.filename}`), () => {})
        }, 30000)

        return res.status(500).send({error: 'Error en el servidor', ok: false})

    } catch (error) {
        const file = req.file
        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${file.filename}`), () => {})
        }, 30000)

        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var deleteNew = async function(req, res){
    try {
        var id = req.params.id
        var data = await news.find({_id: id})

        if(data == ''){
            return res.status(404).send({error: 'No se encuentra la noticia o existe error en el servidor', ok: false})
        }

        await news.deleteOne({_id: id})

        fs.unlinkSync(path.join(__dirname, `../public/images/${data[0].portada}`), () => {})

        return res.status(200).send({message: 'Noticia eliminada con exito', ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

module.exports = {
    create,
    listNews,
    listNew,
    deleteNew
}