const express = require('express');
const router = express.Router();
const weatherService = require('./wheather.service.v1');

//endpoints
router.get('/location', getLocation);
router.get('/current/:city?', getCurrent);
router.get('/forecast/:city?', getForecast);

module.exports = router;

//functions
function getLocation(req, res, next){
    weatherService.getLocation(req, res)
        .then(response => {res.send(response)})
        .catch(next);
}

function getCurrent(req, res, next){
    weatherService.getCurrent(req, res)
        .then(response => {res.send(response)})
        .catch(next);
}

function getForecast(req, res, next){
    weatherService.getForecast(req, res)
        .then(response => {res.send(response)})
        .catch(next);
}