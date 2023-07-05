const { Router } = require('express');
const router = Router();
const { getCountryWeather } = require('../controllers/index.controllers');

//Get countryWetaher by name
router.get("/city", getCountryWeather);



module.exports = router;