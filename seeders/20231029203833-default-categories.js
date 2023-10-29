'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const sysUser = await User.findOne({ where: { username: process.env.DEFAULT_USER_USERNAME } })

    if (sysUser === null) return

   await queryInterface.bulkInsert('Categories', [
    {
      name: 'Salary',
      is_expense: false,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Gifts',
      is_expense: false,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Interests',
      is_expense: false,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Others',
      is_expense: false,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Health',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Leisure',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'House',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Coffee',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Education',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Gifts',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Feeding',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Family',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Daily routine',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Transport',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    },
    {
      name: 'Others',
      is_expense: true,
      is_default: true,
      created_at: new Date(),
      created_by: sysUser.id,
      updated_at: new Date(),
      updated_by: sysUser.id
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
