var mongoose = require('mongoose')
var schema = mongoose.Schema

var shopSchema = schema({
    name: {type: String, require: true},
    region: {type: String, require: true},
    commune: {type: String, require: true},
    link: {type: String, require: true},
    logo: {type: String, require: true}
}, {timestamps: true})

module.exports = mongoose.model('shop', shopSchema)