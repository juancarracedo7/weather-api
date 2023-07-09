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
        country: existingCity.country,
        lat: existingCity.lat,
        lon: existingCity.lon,
      });
    } else {
      const apiUrl = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${firstUpperName}&appid=${process.env.API_URL}&units=metric`
      );

      const cityData = apiUrl.data.find((city) => {
        return city.name === firstUpperName;
      });

      if (cityData) {
        await City.create({
          name: cityData.name,
          country: cityData.country,
          lat: cityData.lat,
          lon: cityData.lon,
        });
  
        res.send(cityData);
      } else {
        res.status(400).send({ error: "No se encontró la ciudad" });
      }
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  getCityCords,
};
