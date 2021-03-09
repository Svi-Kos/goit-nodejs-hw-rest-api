const Joi = require('joi')

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(3)
    .max(30)
    .required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  subscription: Joi.string().alphanum().optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    return next({
      status: 400,
      message: 'missing required fields',
    })
  }
  next()
}

module.exports.createUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next)
}
