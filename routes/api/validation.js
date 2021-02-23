const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .min(3)
        .max(30)
        .required(),
    phone: Joi.string().alphanum().min(3).max(30).required(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .min(3)
        .max(30)
        .optional(),
    phone: Joi.string().alphanum().min(3).max(30).optional(),
})

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        // const [{ message }] = error.details
        return next({
            status: 400,
            message: 'missing required name field',
        })
    }
    next()
}

module.exports.createContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}

// name: Joi.string().alphanum().min(3).max(30).required(),
// email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ['com', 'net'] },
// }),
// phone: Joi.string().regex(/^\d+$/).min(3).max(30).required(),
