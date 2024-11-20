'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
var mongoose = require('mongoose')
var bodyparser = require("body-parser");
var cookies = require('cookie-parser');
var path = require('path');

var adminRoute = require('./routes/adminRoute')
var productRoute = require('./routes/productRoute')
var newsRoute = require('./routes/newsRoute')
var shopRoute = require('./routes/shopRoute')
var configRoute = require('./routes/configRoute')

var port = process.env.PORT || 4201

mongoose.connect('mongodb://127.0.0.1:27017/tsukimoto')
.then((success)=>app.listen(port, ()=>{console.log('Server in ' + port)}))
.catch((error)=>console.log(error))

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));
app.use(cookies());
app.use(express.static(path.join(__dirname, '/public/')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', adminRoute)
app.use('/api/products', productRoute)
app.use('/api/news', newsRoute)
app.use('/api/shops', shopRoute)
app.use('/cfs', configRoute)

module.exports = app