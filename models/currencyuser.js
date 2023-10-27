'use strict'

const { Model } = require('sequelize')

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
    currency_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    total_balance: {
      type: DataTypes.DOUBLE
    },
    is_active: {
      defaultValue: true,
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