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
        isAlpha: {
          msg: 'This field only allow letters'
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
          args: [6, 45],
          msg: 'This field only allow values with length between 6 and 45'
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
    }
  }, {
    sequelize,
    modelName: 'User'
    // underscored: true <-- it does not work correctly
  })

  return User
}
