'use strict'

var express = require('express')
var api = express.Router()
var configController = require('../controllers/configController')
const { isAdmin } = require('../middleware/middleware')

api.post('/gender/create',isAdmin , configController.createGender)
api.get('/gender', configController.listGenres)
api.delete('/gender/:gen',isAdmin , configController.deleteGender)

api.post('/mnt',isAdmin , configController.switchMaintance)
api.get('/mnt', configController.getMaintance)

api.get('/config',isAdmin , configController.getConfig)

module.exports = api