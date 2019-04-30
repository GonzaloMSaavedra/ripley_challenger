'use strict';
const express = require("express");
const router = express.Router();

let obtieneDatosController = require('../controllers/obtieneDatosController');

router.get('/:ciudad', obtieneDatosController.obtieneDatosCiudad);


module.exports = router;