const publicIp = require('public-ip');
const fetch = require("node-fetch");
const config = require('./../../config.json');

module.exports = {
    getLocation,
    getCurrent,
    getForecast
}

async function getLocation(req, res){
    const city = await getCityByIp(req.ip);
    
    return {
        city
    }

}

async function getCurrent(req, res){
    const apiKey = config.openWeather_APIkey;
    var city = req.params.city;

    //Si el parametro city es vacio, obtengo la ubicacion por ip
    if (typeof city === 'undefined') city = await getCityByIp(req.ip);

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {method: 'get'})
        .then(response => {
            
            if (response.status === 401){ 
                res.status(401).send({ message: 'API Key invalida, verifique en openweathermap.org' });
                throw 'API Key invalida';
            }    
            if (response.status === 404) {
                res.status(401).send({ message: 'city no coincide con ninguna ciudad en openweathermap.org' });
                throw 'city no coincide';
            } 
            
            return response.json();
        })
        .then(json => {
            return json['main'];
        })
        .catch(err => {
            throw 'Hubo un error: ' + err;
        });

    return {
        city,
        weather
    };
}

async function getForecast(req, res){
    const apiKey = config.openWeather_APIkey;
    var city = req.params.city;

    //Si el parametro city es vacio, obtengo la ubicacion por ip
    if (typeof city === 'undefined') city = await getCityByIp(req.ip);

    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`, {method: 'get'})
        .then(response => {
            
            if (response.status === 401){ 
                res.status(401).send({ message: 'API Key invalida, verifique en openweathermap.org' });
                throw 'API Key invalida';
            }else if (response.status === 404) {
                res.status(401).send({ message: 'city no coincide con ninguna ciudad en openweathermap.org' });
                throw 'city no coincide';
            } 
            
            return response.json();
            
        })
        .then(json => {
            return json['list'];
        })
        .catch(err => {
            throw 'Hubo un error: ' + err;
        });

    return {
        city,
        forecast
    };
}

async function getCityByIp(pIp){
    //Si la request es local, obtengo el ip publico del equipo
    const ip = pIp === '127.0.0.1'? await publicIp.v4() : pIp;
   
    const city = await fetch(`http://ip-api.com/json/${ip}`, {method: 'get'})
        .then(res => res.json())
        .then(json => {
            return json['city'];
        })
        .catch(err => {
            throw 'Hubo un error: ' + err;
        });
    
    return city;
}