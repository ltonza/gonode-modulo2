const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider_id)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    await Appointment.create({
      user_id: req.session.user.id,
      provider_id: req.params.provider_id,
      date: req.body.date
    })

    return res.redirect('/app/dashboard')
  }

  async index (req, res) {
    if (req.session.user.provider === false) {
      return res.redirect('/app/dashboard')
    }

    const date = moment().add(-1, 'day')
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      include: [
        {
          model: User,
          as: 'Customer'
        }
      ]
    })

    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const schedules = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      const appointment = appointments.find(
        a => moment(a.date).format('H:mm') === time
      )

      return {
        time,
        value: value.format(),
        customer: appointment ? appointment.Customer : null
      }
    })

    return res.render('appointments/index', { schedules })
  }
}

module.exports = new AppointmentController()
