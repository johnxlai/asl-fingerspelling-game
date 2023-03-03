const resultData = require('./resultSeeds');
const userData = require('./userSeeds');
const { User, Result } = require('../models');
const superUser = require('./superUsersSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  //Creating a superUser
  await superUser();

  await sequelize.sync({ force: true });
  await User.bulkCreate(userData);

  await Result.bulkCreate(resultData);

  process.exit(0);
};

seedAll();
