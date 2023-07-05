const axios = require("axios");
const dotenv = require("dotenv");
const City = require("../models/city");

dotenv.config();

// GET BY NAME
const getCountryWeather = async (req, res, next) => {
  try {
    const { name } = req.query;
    const firstUpperName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const apiUrl = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${firstUpperName}&appid=${process.env.API_URL}&units=metric`
    );


    const filteredForecast = apiUrl.data.list
      .map((city) => ({
        name: firstUpperName,
        weather: city.weather[0].main,
        desc: city.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`,
        temp: city.main.temp,
        temp_min: city.main.temp_min,
        temp_max: city.main.temp_max,
        time: city.dt_txt.slice(0, 10),
      }))


    if (filteredForecast.length === 0) {
      return res.status(404).json({ message: 'No se encontró un pronóstico para el día de hoy.' });
    }

    const apiFormat = filteredForecast[0];

    await City.create(apiFormat);

    res.send(apiFormat);
    console.log("info", apiFormat);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  getCountryWeather,
};
