const {  DataTypes } = require('sequelize');
const db = require('../database/index');

const Forecast = db.define('Forecast', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
      },
      dt: {
        type: DataTypes.STRING,
      },
      feels_like: {
        type: DataTypes.FLOAT,
      },
      humidity: {
        type: DataTypes.INTEGER,
      },
      pressure: {
        type: DataTypes.INTEGER,
      },
      temp: {
        type: DataTypes.FLOAT,
      },
      temp_max: {
        type: DataTypes.FLOAT,
      },
      temp_min: {
        type: DataTypes.FLOAT,
      },
      main: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.STRING,
      },
      speed: {
        type: DataTypes.FLOAT,
      },
      deg: {
        type: DataTypes.INTEGER,
      },
      gust: {
        type: DataTypes.FLOAT,
      },
      all: {
        type: DataTypes.INTEGER,
      },
      pop: {
        type: DataTypes.FLOAT,
      },
      visibility: {
        type: DataTypes.INTEGER,
      },
      sunrise: {
        type: DataTypes.INTEGER,
      },
      sunset: {
        type: DataTypes.INTEGER,
      },
});

module.exports = Forecast;
