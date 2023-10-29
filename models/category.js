'use strict'

const { Model } = require('sequelize')

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         name:
 *           type: string
 *           example: Family
 *         is_expense:
 *           type: string
 *           example: true
 *         createdAt:
 *           type: string
 *           example: 2020-03-10T04:05:06.157Z
 */
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Category.init({
    name: DataTypes.STRING,
    isExpense: {
      field: 'is_expense',
      type: DataTypes.BOOLEAN
    },
    isDefault: {
      field: 'is_default',
      type: DataTypes.BOOLEAN
    },
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
    modelName: 'Category',
    tableName: 'categories',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedBy: 'deleted_by'
  })

  return Category
}
