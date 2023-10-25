'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Currency.init({
    abbreviation: DataTypes.STRING,
    name: DataTypes.STRING,
    createdBy: {
      field: 'created_by',
      type: DataTypes.INTEGER
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.INTEGER
    },
    deletedBy: {
      field: 'deleted_by',
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Currency',
    tableName: 'currencies',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedBy: 'deleted_by'
  })

  return Currency
}