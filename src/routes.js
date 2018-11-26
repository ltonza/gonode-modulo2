const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserControler = require('./app/controllers/UserController')
const SessionControler = require('./app/controllers/SessionController')
const DashboardControler = require('./app/controllers/DashboardController')
const FileControler = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/files/:file', FileControler.show)

routes.get('/', guestMiddleware, SessionControler.create)
routes.post('/signin', SessionControler.store)

routes.get('/signup', guestMiddleware, UserControler.create)
routes.post('/signup', upload.single('avatar'), UserControler.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionControler.destroy)

routes.get('/app/dashboard', DashboardControler.index)

routes.get('/app/appointments', AppointmentController.index)

routes.get('/app/appointments/new/:provider_id', AppointmentController.create)
routes.post('/app/appointments/new/:provider_id', AppointmentController.store)

routes.get('/app/available/:provider_id', AvailableController.index)

module.exports = routes
