const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    { 
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
 
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [4]
          }
        },

        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        
        image: {
          type: DataTypes.STRING,
          defaultValue: '/image/user/userDefault.png'
        },

        superuser: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        }
      },
    
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // async beforeBulkCreate(newUsersData) {
      //   return newUsersData.forEach(async (user) => {
      //     return (user.password = await bcrypt.hash(user.password, 10));
      //   });
      // },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
