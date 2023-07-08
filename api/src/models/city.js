const {  DataTypes } = require('sequelize');
const db = require('../database/index');

const City = db.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lon: {
    type: DataTypes.FLOAT,
  },
});

module.exports = City;
