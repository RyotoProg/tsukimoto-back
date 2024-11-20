'use strict'

var admin = require('../models/admin')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
var cookie = require("cookie")

const register = async function(req, res){
    var data = req.body
    console.log(data)
    bcrypt.hash(data.password , null, null, async function(err, hash){
        if(hash){
            data.password = hash
            var reg = await admin.create(data)
            res.status(200).send({message: 'registrado'})
        }else{
            res.status(200).send({error: 'error al registrar el usuario'})
        }
    })
}

const login = async function(req, res){
    try {
        var data = req.body
        var admin_arr = await admin.find({email: data.email})
        let admin_db = admin_arr[0]

        if(admin_arr.length == 0){
            res.status(200).send({error: 'Email incorrecto porfavor ingrese un email valido'})
        } else {
            bcrypt.compare(data.password, admin_db.password, async function(error, check){
                if(check){
                    const token = jwt.sign(
                        {
                          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                          email: admin_db.email,
                        },
                        process.env.JWT_SECRET
                      );
                    //   Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
                      const serialized = cookie.serialize("TokenAuth", token, {
                        httpOnly: false,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        path: '/'
                      });
                    
                      res.status(200).send({ message: "Logueado con exito", ok: true, cookie: serialized});
                } else {
                    res.status(200).send({ error: "La contraseña es incorrecta" });
                }
            })
        }
    } catch (error) {
        res.status(200).send({error: 'Error en el servidor', ok: false})
    }
}

const verifyToken = async function(req, res) {
    try {
        var token = req.params.token

        const verify = await jwt.verify(token, process.env.JWT_SECRET)

        return res.status(200).send({ok:true})
    } catch (error) {
        console.log(error)
        return res.status(200).send({ok: false})
    }
}

module.exports = {
    register,
    login,
    verifyToken
}