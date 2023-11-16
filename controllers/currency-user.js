const { Currency, CurrencyUser, User } = require('../models')

const create = async (req, res) => {
  const { id: uid } = req.body
  const { id } = req.params

  try {
    const currency = await Currency.findByPk(id)
    
    const user = await User.findByPk(uid, {
      attributes: ['id', 'username', 'nick', ['created_at', 'createdAt']]
    })

    if (currency === null) {
      return res.status(404).json({ success: false, error: 'Currency not found.' })
    }

    if (!currency.isDefault && uid !== currency.created_by) {
      return res.status(400).json({ success: false, error: 'You don\'t have access to this resource.' })
    }

    const obj = CurrencyUser.build({ currencyId: id, userId: uid, totalBalance: 0, isActive: true, createdBy: uid, updatedBy: uid })
    const currencyUser = await obj.save()

    const data = {
      currency: { id: currency.id, abbreviation: currency.abbreviation, name: currency.name, createdAt: currency.created_at },
      user,
      totalBalance: currencyUser.totalBalance,
      isActive: currencyUser.isActive,
      createdAt: currencyUser.created_at
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: (error.errors ?? error.message) })
  }
}

module.exports = { create }
