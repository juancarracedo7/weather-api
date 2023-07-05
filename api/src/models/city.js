const {  DataTypes } = require('sequelize');
const db = require('../database/index');

const City = db.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weather: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temp_min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temp_max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = City;
