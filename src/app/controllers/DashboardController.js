const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    if (req.session.user.provider) return res.redirect('/app/appointments')

    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
