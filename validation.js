const Joi = require("joi");

// validating registration
const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required()
        });

    return schema.validate(data);
}

// validating login


// logic to verify our token (JWT)

module.exports = { registerValidation };