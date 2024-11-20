"use strict";

const multer = require("multer");
const uuid = require('uuid')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var ruta = path.join(__dirname, `../public/images/`)
    cb(null, ruta);
  },
  filename: function (req, file, cb) {
    var name = uuid.v6() + file.originalname.slice(file.originalname.lastIndexOf("."))
    cb(
      null,
      name
    );
  }
});

const multerProd = multer({ storage }).fields([
  { name: "portada", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);

const multerNew = multer({ storage }).single('portada')

const multerShop = multer({ storage }).single('logo')

module.exports = {
  multerProd,
  multerNew,
  multerShop
};