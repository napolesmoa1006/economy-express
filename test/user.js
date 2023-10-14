const test = require('node:test')
const assert = require('node:assert')

const usersController = require('../controllers/users')

test('get user list', async () => {
  const result = await usersController.getAll()
  assert.strictEqual(result.success, true)
})
