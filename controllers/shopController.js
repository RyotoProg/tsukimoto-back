'use strict'

var shop = require('../models/shop')
var fs = require('fs')
var path = require('path')

var listShops = async function(req, res){
    try {
        var data = await shop.find({})

        if(!data){
            return res.status(404).send({error: 'No se encuentran tiendas o existe error en el servidor', ok: false})
        }
        
        return res.status(200).send({data, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

var listShop = async function(req, res){
    try {
        var id = req.params.id
        var data = await shop.find({_id: id})

        if(!data){
            return res.status(404).send({error: 'No se encuentra la tienda o existe error en el servidor', ok: false})
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
        data.logo = file.filename

        const reg = await shop.create(data)

        if(reg){
            return res.status(200).send({message: 'Tienda agregada con exito', ok: true})
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

var deleteShop = async function(req, res){
    try {
        var id = req.params.id
        var data = await shop.find({_id: id})

        if(data == ''){
            return res.status(404).send({error: 'No se encuentra la tienda o existe error en el servidor', ok: false})
        }

        await shop.deleteOne({_id: id})

        fs.unlinkSync(path.join(__dirname, `../public/images/${data[0].logo}`), () => {})

        return res.status(200).send({message: 'Tienda eliminada con exito', ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

module.exports = {
    create,
    listShops,
    listShop,
    deleteShop
}