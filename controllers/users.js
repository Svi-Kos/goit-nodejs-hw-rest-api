const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'conflict',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use',
      })
    }
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'Created',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user.validPassword(password)
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'Unauthorized',
        code: HttpCode.UNAUTHORIZED,
        data: 'Unauthorized',
        message: 'Email or password is wrong',
      })
    }
    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    const subscription = user.subscription
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'OK',
      code: HttpCode.OK,
      data: {
        token,
        email,
        subscription,
      },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  const userId = req.user.id
  await Users.updateToken(userId, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const current = async (req, res, next) => {
  try {
    const token = req.user.token
    const user = await Users.findByToken(token)
    const subscription = user.subscription
    const email = user.email
    if (user) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { subscription, email },
      })
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'Unauthorized',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  reg,
  login,
  logout,
  current,
}
