var mongoose = require('mongoose')
var schema = mongoose.Schema

var newSchema = schema({
    name: {type: String, require: true},
    date: {type: Date, require: true},
    portada: {type: String, require: true},
    content: {type: String, require: true},
    previewContent: {type: String, require: true}
}, {timestamps: true})

module.exports = mongoose.model('new', newSchema)