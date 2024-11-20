'use strict'

var express = require('express')
var api = express.Router()
var shopController = require('../controllers/shopController')
var { multerShop } = require('../middleware/multer')
const { isAdmin } = require('../middleware/middleware')

api.get('', shopController.listShops)
api.post('/create', [isAdmin, multerShop], shopController.create)
api.get('/:id', shopController.listShop)
api.delete('/:id', isAdmin, shopController.deleteShop)

module.exports = api