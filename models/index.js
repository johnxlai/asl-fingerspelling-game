const User = require('./User');
const Result = require('./Result');



//create associations
User.hasMany(Result, {
    foreignKey: 'user_id'
});

Result.belongsTo(User, {
    foreignKey: 'user_id',
});
  

module.exports = {User, Post, Comment};