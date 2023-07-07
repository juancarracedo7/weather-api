const axios = require("axios");
const dotenv = require("dotenv");
const City = require("../models/city");

dotenv.config();

const getCityCords = async (req, res, next) => {
  try {
    const { name } = req.query;
    const firstUpperName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const existingCity = await City.findOne({
      where: { name: firstUpperName },
    });

    if (existingCity) {
      res.send({
        name: existingCity.name,
        lat: existingCity.lat,
        lon: existingCity.lon,
      });
    } else {
      const apiUrl = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${firstUpperName}&appid=${process.env.API_URL}&units=metric`
      );

      const filteredForecast = apiUrl.data.map((city) => {
        return {
          name: city.name,
          lat: city.lat,
          lon: city.lon,
        };
      });

      await City.bulkCreate(filteredForecast);

      res.send(filteredForecast);
      console.log("info", filteredForecast);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};


module.exports = {
  getCityCords,
};
