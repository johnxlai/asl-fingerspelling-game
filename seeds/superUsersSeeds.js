const { User } = require('../models');
require('dotenv').config();

module.exports = async () => {
  User.create({
    username: 'mark',
    password: process.env.SUPERUSERPW,
    level: 100000,
    superuser: true,
  });
};
