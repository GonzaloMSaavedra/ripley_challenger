const app = require("../app");
const express = require("express");
const moment = require("moment");
const router = express.Router();
var getJSON = require('get-json');
//PARTE PARA CONECTAR CON REDIS 
var redis = require('redis');
var client = redis.createClient('redis://rediscloud:eDN0iWot7vDvpvs09EeLlIGFrCTYKFAA@redis-18724.c10.us-east-1-3.ec2.cloud.redislabs.com:18724', {no_ready_check: true});

 

exports.obtieneDatosCiudad = function (req, res){

	
	//DEFINIMOS EN DURO LOS DATOS DE LATITUS Y LONGITUD, PARA DESPUES CONCATENAR A LA URL FINAL
	let santiago = '-33.4727092,-70.7699143';
	let Zurich = '47.3774337,8.4666757';
	let Auckland = '-36.8629409,174.7253866';
	let Sydney = '-33.847927,150.6517941';
	let Londres = '51.5285582,-0.2416797';
	let Georgia = '32.6581671,-85.4214789';

	//GUARDAMOS LATITUS Y LONGITUD EN REDIS
	client.set('Santiago', santiago, redis.print);
	client.set('Zurich', Zurich, redis.print);
	client.set('Auckland', Auckland, redis.print);
	client.set('Sydney', Sydney, redis.print);
	client.set('Londres', Londres, redis.print);
	client.set('Georgia', Georgia, redis.print);

    let nombreCiudad = req.params.ciudad;

	client.get(nombreCiudad, function (error, result) {

console.log(result);
		getJSON('https://api.darksky.net/forecast/de06e7742ef77b3ec85d6186a71325e1/'+result, function(error, response){
		 
					if (error) {
		        // GUARDA EL ERROR CUANDO OBTIENE LA CORDENADA
		        //client.set('api.errors', moment(), error);
		        //throw error;
	        }

		    res.status(200).json({
				response
			});

		});
	});
};


