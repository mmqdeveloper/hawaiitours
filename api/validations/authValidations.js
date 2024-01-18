import Joi from 'joi';
const registerValidation = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
    }),
    phone: Joi.string().pattern(new RegExp('^\\d{10}$')).required().messages({
    'string.pattern.base': 'Phone number should be 10 digits long',
    'string.empty': 'Phone number is required',
    }),
    contactInfo: Joi.object({
        website: Joi.string(),
    }),
    img: Joi.string(),
    role: Joi.string().default('Customer')
})
export const authValidations = {
    registerValidation
}