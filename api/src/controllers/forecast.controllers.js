const axios = require("axios");
const dotenv = require("dotenv");
const Forecast = require("../models/forecast");

dotenv.config();

const getCityForecast = async (req, res, next) => {
    try {
      const { lat, lon } = req.query;
  
      const apiUrl = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${process.env.API_URL}`
      );

     
      
  
      const filteredForecast = apiUrl.data.list
        .slice(0, 16) // Obtiene los primeros 7 elementos
        .map((forecast) => {
          // ... Mismo código de filtrado ...
  
          return {
            dt: forecast.dt_txt,
            feels_like: forecast.main.feels_like,
            humidity: forecast.main.humidity,
            pressure: forecast.main.pressure,
            temp: forecast.main.temp,
            temp_max: forecast.main.temp_max,
            temp_min: forecast.main.temp_min,
            main: forecast.weather[0].main,
            description: forecast.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`,
            speed: forecast.wind.speed,
            deg: forecast.wind.deg,
            gust: forecast.wind.gust,
            all: forecast.clouds.all,
            pop: forecast.pop,
            visibility: forecast.visibility,
            sunrise: apiUrl.data.city.sunrise,
            sunset: apiUrl.data.city.sunset,
          };
        });
  
      await Forecast.bulkCreate(filteredForecast);
      res.send(filteredForecast);
    } catch (error) {
      next(error);
      console.log(error);
    }
  };
  
  module.exports = {
    getCityForecast,
    };