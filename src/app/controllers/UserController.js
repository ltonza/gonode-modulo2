const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    try {
      const avatar = req.file && req.file.filename ? req.file.filename : ''

      await User.create({ ...req.body, avatar })
    } catch (error) {
      console.error(error)
      return res.send(error)
    }

    return res.redirect('/')
  }
}

module.exports = new UserController()
