const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Result extends Model {
    
}

Result.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },

      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Result;