'use strict'

const { Model } = require('sequelize')

/**
 * @openapi
 * components:
 *   schemas:
 *     Currency:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 37
 *         abbreviation:
 *           type: string
 *           example: CUP
 *         name:
 *           type: string
 *           example: Cuban Peso
 *         createdAt:
 *           type: string
 *           example: 2020-03-10T04:05:06.157Z
 */
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