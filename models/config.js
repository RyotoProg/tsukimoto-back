var mongoose = require('mongoose')
var schema = mongoose.Schema

var configSchema = schema({
    genres: {type: Array, require: false},
    maintance: {type: Boolean, require: false, default: false}
}, {timestamps: true})

module.exports = mongoose.model('config', configSchema)