const express = require('express')
const router = express.Router()
const userControllers = require('../../../controllers/users')
const guard = require('../../../helpers/guards')
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg')
const { createUser } = require('./validation')

router.post(
  '/auth/registration',
  createAccountLimiter,
  createUser,
  userControllers.reg
)
router.post('/auth/login', userControllers.login)
router.post('/auth/logout', guard, userControllers.logout)

router.get('/current', guard, userControllers.current)

module.exports = router
