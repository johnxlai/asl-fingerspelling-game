const User = require('./User');
const Result = require('./Result');

User.hasMany(Result, {
    foreignKey: 'user_id'
});

Result.belongsTo(User, {
    foreignKey: 'user_id',
});
  

module.exports = {User, Result};
