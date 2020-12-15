const Joi = require('@hapi/joi')
//Register Validation
const userValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .alphanum()
            .required()
            .trim()
            .max(40),
        password: Joi.string()
            .min(8)
            .max(256)
            .trim()
            .required()
    })
    return schema.validate(data)
}

module.exports.userValidation = userValidation