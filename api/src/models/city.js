const {  DataTypes } = require('sequelize');
const db = require('../database/index');

const City = db.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lon: {
    type: DataTypes.FLOAT,
  },
});

module.exports = City;
