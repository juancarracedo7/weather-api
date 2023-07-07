const { Router } = require('express');
const router = Router();
const { getCityCords } = require('../controllers/city.controllers');
const { getCityForecast } = require('../controllers/forecast.controllers');

//Get countryWetaher by name
router.get("/city", getCityCords);
router.get("/forecast", getCityForecast);



module.exports = router;