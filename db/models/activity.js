const db = require('../_db');
const Sequelize = require('sequelize');

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age_range: {
    type: Sequelize.STRING,
  }
});

module.exports = Activity;
