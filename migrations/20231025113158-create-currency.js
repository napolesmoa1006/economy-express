'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      abbreviation: {
        allowNull: false,
        type: Sequelize.STRING(3)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      is_default: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updated_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      deleted_by: {
        type: Sequelize.INTEGER
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Currencies')
  }
}