'use strict'

const { Model } = require('sequelize')

/**
 * @openapi
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             authToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTY5NzMxMTI2MiwiZXhwIjoxNjk3MzI1NjYyfQ.8Meff6Tj3Wnt8tVkoZ10L4OTgLxVwrPmv0lc5MhBnAk
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         username:
 *           type: string
 *           example: system
 *         nick:
 *           type: string
 *           example: SysUser
 *         createdAt:
 *           type: string
 *           example: 2020-03-10T04:05:06.157Z
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 */

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.belongsToMany(models.Currency, {
        through: {
          model: models.CurrencyUser
        },
        as: 'currencies',
        foreignKey: 'userId'
      })
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
    isActive: {
      defaultValue: true,
      field: 'is_active',
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // <-- avoid error: Table 'database.Users' doesn't exist
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  return User
}
