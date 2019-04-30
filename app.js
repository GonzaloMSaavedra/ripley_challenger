const express = require("express");
const app = express();
const morgan = require('morgan');
let bodyParser = require('body-parser')

const obtienedatosRoutes = require('./routes/obtieneDatos');


//EJECUTA FUNCION QUE GUARDA LONGITUD Y LATITUD AL INICIAR LA APLICACION
let obtieneDatosController = require('./controllers/obtieneDatosController');
obtieneDatosController.guardaCordenadas;
//

//CONTROL DE ACCESO
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//SOLO PARA LA CONSOLA
app.use(morgan('dev'));

//ROUTER (EN ESTE CASO SOLO OCUPAREOS UNO PARA TODAS LOS REQUEST)
app.use('/obtienedatos', obtienedatosRoutes)


//CONTROL DE ERRORES 
//*LO USE PARA SABER QUE GUARDABA LA CORDENADA Y EN LA PANTALLA NO MOSTRARA ERROR, SINO EL MENSAJE*
app.use((req, res, next) => {
	 const error = new Error('No se encontro');
	 error.status = 404;
	 next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});






module.exports = app;