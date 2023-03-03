const resultData = require('./resultSeeds');
const userData = require('./userSeeds');
const { User, Result } = require('../models');
const superUser = require('./superUsersSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  // await User.bulkCreate(userData);

  await User.create({
    username: 'mark',
    password: '123456',
    level: 100000,
    superuser: true,
  });
  await User.create({
    username: 'peter-parker',
    level: 3,
    password: 'password3',
  });

  await User.create({
    username: 'richey_rich',
    level: 2,
    password: 'password2',
  });

  await Result.bulkCreate(resultData);

  //Creating a superUser
  await superUser();

  process.exit(0);
};

seedAll();
