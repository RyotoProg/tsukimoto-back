var mongoose = require('mongoose')
var schema = mongoose.Schema

const stockControl = schema({
    stock: {type: Number, require: true},
    date: {type: Date, require: true}
}, {timestamps: true})

const Vols = schema({
    name: {type: String, require:true},
    autor: {type: String, require:true},
    ilustrator: {type: String, require:true},
    isbn: {type: Number, require: true},
    sku: {type: String, require: true},
    vol: {type: Number, require: true},
    price: {type: Number, require:true},
    pages: {type: Number, require: true},
    stock: {type: Number, require: true},
    sinopsis: {type: String, require: true},
    sinopsiCard: {type: String, require: true},
    portada: {type: String, require: true},
    banner: {type: String, require: true},
    date: {type: Date, require: true},
    genres: {type: Array, require: true},
    income: {type: [stockControl], require: true},
    egress: {type: [stockControl], require: true}
}, {timestamps: true})

var productSchema = schema({
    name: {type: String, require: true},
    sku: {type: String, require: true},
    date: {type: Date, require: false},
    price: {type: Number, require: false},
    stock: {type: Number, require: false},
    vols: {type: [Vols], require: false},
    type: {type: String, require: true},
    income: {type: [stockControl], require: false},
    egress: {type: [stockControl], require: false}
}, {timestamps: true})

module.exports = mongoose.model('product', productSchema)