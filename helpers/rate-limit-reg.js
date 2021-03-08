const rateLimit = require('express-rate-limit')
const { HttpCode } = require('./constants')

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'bad request',
      message:
        'Too many registrations, no more 5 attempts in an hour from one IP',
    })
  },
})

module.exports = { createAccountLimiter }
