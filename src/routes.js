const express = require('express')
const routes = express.Router()

const UserControler = require('./app/controllers/UserController')

routes.get('/signup', UserControler.create)
routes.post('/signup', UserControler.store)

module.exports = routes
