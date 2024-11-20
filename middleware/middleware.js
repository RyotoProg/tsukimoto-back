var jwt = require('jsonwebtoken')
const admin = require('../models/admin')

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.tath
        
        if(token === null){
            res.status(404)
        }

        const verify = await jwt.verify(token, process.env.JWT_SECRET)

        const adminDb = await admin.find({email:verify.email})

        if(adminDb.length === 0){
            res.status(404)
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

module.exports = {
    isAdmin
}