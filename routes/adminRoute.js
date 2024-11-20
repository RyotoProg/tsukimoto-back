'use strict'

var express = require('express')
var api = express.Router()
var adminController = require('../controllers/adminController')

//api.post('/register', adminController.register)
api.post('/login', adminController.login)

api.get('/verify/:token', adminController.verifyToken)

module.exports = api