const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    await User.create({ ...req.body, password_hash: req.body.password })

    res.redirect('/')
  }
}

module.exports = new UserController()
