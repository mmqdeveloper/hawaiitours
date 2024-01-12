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
    country: Joi.string().required().messages({
        'string.empty': 'County is required',
    }),
    city: Joi.string().required().messages({
        'string.empty': 'City is required',
    }),
    img: Joi.string(),
    isAdmin: Joi.boolean()

})
export const authValidations = {
    registerValidation
}