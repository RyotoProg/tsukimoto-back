'use strict'

var product = require('../models/product')
var { validLibro } = require('../helpers/valid')
var fs = require('fs')
var path = require('path')

const products = async function(req, res){
    try {
        var products = await product.find({})

        if(!products){
            return res.status(404).send({error: 'No se encuentran productos o existe error en el servidor', ok: false})
        }
        
        return res.status(200).send({products, ok: true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const oneSerie = async function(req, res){
    try {
        var sku = req.params.sku
        var data = await product.find({sku: sku})

        if(!data){
            return res.status(404).send({error: 'No se encuentra el producto o existe error en el servidor', ok: false})
        }
        
        return res.status(200).send({data, ok: true})

    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const createSerie = async function(req, res){
    try {
        var data = req.body;
        var files = req.files;
        var prod = await product.find({sku: data.sku});
        //const valid = await validLibro(data, files)
        const valid = false

        if(prod.length != 0){
            setTimeout(async ()=>{
                fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
                fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
            }, 30000)

            return res.status(500).send({error: 'Ya se encuentra esta serie en el inventario', ok: false})
        }

        if(valid){
            setTimeout(async ()=>{
                fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
                fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
            }, 30000)

            return res.status(500).send({error: valid.error, ok: false})
        }

        var dat = {
            name: data.name,
            sku: data.sku,
            type: 'serie',
            vols: [
                {
                    name: data.nameVol,
                    sku: data.skuVol,
                    autor: data.autor,
                    ilustrator: data.ilustrator,
                    isbn: data.isbn,
                    vol: 1,
                    price: data.price,
                    pages: data.pages,
                    stock: data.stock,
                    sinopsis: data.sinopsis,
                    sinopsisCard: data.sinopsiCard,
                    portada: files.portada[0].filename,
                    banner: files.banner[0].filename,
                    date: data.date,
                    genres: data.genres,
                    income: [{
                        stock: data.stock,
                        date: data.date
                    }],
                    egress: []
                }
            ]
        }
        const reg = await product.create(dat)

        if(reg){
            return res.status(200).send({ok: true, message: 'Serie agregada con exito'})
        }
        
        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
        }, 30000)

        return res.status(500).send({error: 'Error en el servidor', ok: false})

    } catch (error) {
        const files = req.files;
        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
        }, 30000)

        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const createVol = async function(req, res) {
    try {
        var data = req.body;
        var files = req.files;
        var serie = await product.find({sku: data.serie})

        var vol = {
            name: data.nameVol,
            sku: data.skuVol,
            autor: data.autor,
            ilustrator: data.ilustrator,
            isbn: data.isbn,
            vol: data.vol,
            price: data.price,
            pages: data.pages,
            stock: data.stock,
            sinopsis: data.sinopsis,
            sinopsisCard: data.sinopsiCard,
            portada: files.portada[0].filename,
            banner: files.banner[0].filename,
            date: data.date,
            genres: data.genres,
            income: [{
                stock: data.stock,
                date: data.date
            }],
            egress: []
        }

        serie[0].vols.push(vol)

        const reg = await product.findOneAndUpdate({sku: data.serie}, serie[0])

        if(reg){
            return res.status(200).send({ok: true, message: 'Volumen agregado con exito'})
        }

        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
        }, 30000)
        return res.status(500).send({error: 'Error en el servidor', ok: false})

    } catch (error) {
        const files = req.files;
        setTimeout(async ()=>{
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.portada[0].filename}`), () => {})
            fs.unlinkSync(path.join(__dirname, `../public/images/${files.banner[0].filename}`), () => {})
        }, 30000)

        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const deleteSerie = async function(req, res){
    try {
        var sku = req.params.sku
        var data = await product.find({sku: sku})

        if(data == ''){
            return res.status(404).send({error: 'No se encuentra la serie o existe error en el servidor', ok: false})
        }

        var vols = data[0].vols
            
        await product.deleteOne({sku: sku})

        vols.map(vol => {
            fs.unlinkSync(path.join(__dirname, `../public/images/${vol.portada}`))
            fs.unlinkSync(path.join(__dirname, `../public/images/${vol.banner}`))
        })

        return res.status(200).send({message: 'Serie eliminada con exito', ok: true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const deleteVol = async function(req, res){
    try {
        var sku = req.params.sku
        var data = await product.find({'vols.sku': sku})

        if(data == ''){
            return res.status(404).send({error: 'No se encuentra el volumen o existe error en el servidor', ok: false})
        }

        var deleteVol = data[0].vols.filter(vol => vol.sku === sku)
        data[0].vols = data[0].vols.filter(vol => vol.sku != sku)
            
        await product.findOneAndUpdate({sku: data[0].sku}, data[0])

        fs.unlinkSync(path.join(__dirname, `../public/images/${deleteVol.portada}`))
        fs.unlinkSync(path.join(__dirname, `../public/images/${deleteVol.banner}`))

        return res.status(200).send({message: 'Volumen eliminado con exito', ok: true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

const series = async function(req, res){
    try {
        var serie = await product.find({type: 'serie'})

        if(serie.length === 0){
            return res.status(404).send({error: 'No existen series', ok: false})
        }

        return res.status(200).send({serie, ok: true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error: 'Error en el servidor, porfavor contacte al soporte para resolver el inconveniente', ok: false})
    }
}

module.exports = {
    products,
    oneSerie,
    createSerie,
    deleteSerie,
    deleteVol,
    createVol,
    series
}