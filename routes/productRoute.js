'use strict'

var express = require('express')
var api = express.Router()
var productController = require('../controllers/productController')
var { multerProd } = require('../middleware/multer')
const { isAdmin } = require('../middleware/middleware')

api.get('/', productController.products)
api.post('/createserie', [isAdmin, multerProd], productController.createSerie)
api.post('/createvol', [isAdmin, multerProd], productController.createVol)
api.get('/serie/:sku', productController.oneSerie)
api.delete('/serie/:sku', isAdmin, productController.deleteSerie)
api.delete('/serie/vol/:sku',isAdmin , productController.deleteVol)
api.get('/series', productController.series)

module.exports = api