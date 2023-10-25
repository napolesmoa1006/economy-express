'use strict'

/** @type {import('sequelize-cli').Migration} */

require('dotenv').config()
const fetch = require('node-fetch')

const { User } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */
    const sysUser = await User.findOne({ where: { username: process.env.DEFAULT_USER_USERNAME } })

    if (sysUser === null) return

    const myHeaders = new fetch.Headers()
    myHeaders.append('apikey', process.env.API_LAYER_KEY)

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    }

    let currencies = []

    await fetch("https://api.apilayer.com/currency_data/list", requestOptions)
      .then(response => response.json())
      .then(result => {
        for (const key in result.currencies) {
          const currency = {
            abbreviation: key,
            name: currencies[key],
            created_at: new Date(),
            created_by: sysUser.id,
            updated_at: new Date(),
            updated_by: sysUser.id
          }

          currencies.push(currency)
        }
      })
      .catch(error => console.log('error', error))

     await queryInterface.bulkInsert('Currencies', currencies)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
    await queryInterface.bulkDelete('Currencies', null, {})
  }
}
