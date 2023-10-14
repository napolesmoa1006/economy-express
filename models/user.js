'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field is required'
        },
        isAlphanumeric: {
          msg: 'This field only allow letters and numbers'
        },
        len: {
          args: [3, 45],
          msg: 'This field only allow values with length between 3 and 45'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field is required'
        },
        len: {
          args: [6, 128],
          msg: 'This field only allow values with length between 6 and 128'
        }
      }
    },
    nick: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 45],
          msg: 'This field only allow values with length between 3 and 45'
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users' // <-- avoid error: Table 'database.Users' doesn't exist
    // underscored: true <-- it does not work correctly
  })

  return User
}
