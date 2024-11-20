'use strict'

var express = require('express')
var api = express.Router()
var newController = require('../controllers/newsController')
var { multerNew } = require('../middleware/multer')
const { isAdmin } = require('../middleware/middleware')

api.get('', newController.listNews)
api.post('/create', [isAdmin ,multerNew], newController.create)
api.get('/:id', newController.listNew)
api.delete('/:id', isAdmin, newController.deleteNew)

module.exports = api