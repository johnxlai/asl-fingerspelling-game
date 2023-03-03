const { User } = require('../models');

User.create({
  username: 'John',
  password: '123456',
  level: 100000,
  superuser: true,
});
