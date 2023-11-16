'use strict'

const { Model } = require('sequelize')

/**
 * @openapi
 * components:
 *   schemas:
 *     CurrencyUser:
 *       type: object
 *       properties:
 *         currency:
 *           $ref: '#/components/schemas/Currency'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         total_balance:
 *           type: number
 *           example: 1800.75
 *         is_active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           example: 2020-03-10T04:05:06.157Z
 */
module.exports = (sequelize, DataTypes) => {
  class CurrencyUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CurrencyUser.belongsTo(models.Currency)
      CurrencyUser.belongsTo(models.User)
    }
  }
  CurrencyUser.init({
    currencyId: {
      field: 'currency_id',
      type: DataTypes.INTEGER
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER
    },
    totalBalance: {
      field: 'total_balance',
      type: DataTypes.DOUBLE
    },
    isActive: {
      defaultValue: true,
      field: 'is_active',
      type: DataTypes.BOOLEAN
    },
    createdBy: {
      field: 'created_by',
      type: DataTypes.INTEGER
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'CurrencyUser',
    tableName: 'currencyusers',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  return CurrencyUser
}