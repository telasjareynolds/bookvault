"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookData = exports.validateBookId = exports.validateLoginAuth = exports.validateUserCreation = void 0;
const celebrate_1 = require("celebrate");
const validator_1 = __importDefault(require("validator"));
// Custom URL validation function
const validateURL = (value, helpers) => {
    if (validator_1.default.isURL(value))
        return value;
    return helpers.error("string.uri");
};
// Validate user registration (signup)
exports.validateUserCreation = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().min(2).max(30).messages({
            "string.min": 'The minimum length of the "name" field is 2',
            "string.max": 'The maximum length of the "name" field is 30',
            "string.empty": 'The "name" field must be filled in',
        }),
        email: celebrate_1.Joi.string().required().email().messages({
            "string.email": "Please enter a valid email address.",
            "string.empty": "Email is required.",
        }),
        password: celebrate_1.Joi.string().required().min(8).messages({
            "string.min": 'The minimum length of the "password" field is 8',
            "string.empty": 'The "password" field must be filled in',
        }),
    }),
});
// Validate login
exports.validateLoginAuth = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().required().email().messages({
            "string.email": "Please enter a valid email address.",
            "string.empty": "Email is required.",
        }),
        password: celebrate_1.Joi.string().required().min(8).messages({
            "string.min": 'The minimum length of the "password" field is 8',
            "string.empty": 'The "password" field must be filled in',
        }),
    }),
});
// Validate book ID in params
exports.validateBookId = (0, celebrate_1.celebrate)({
    params: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.string().required().messages({
            "string.empty": 'The "id" param must be provided.',
        }),
    }),
});
// Validate book creation/editing
exports.validateBookData = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        _id: celebrate_1.Joi.string().messages({
            "string.empty": 'The "_id" field must be filled in',
        }),
        title: celebrate_1.Joi.string().required().min(2).messages({
            "string.min": 'The "title" must be at least 2 characters long.',
            "string.empty": 'The "title" field must be filled in',
        }),
        author: celebrate_1.Joi.string().optional().allow(""),
        year: celebrate_1.Joi.number().required().min(1000).max(9999).messages({
            "number.base": 'The "year" field must be a number',
            "number.min": 'The "year" must be a 4-digit year',
            "number.max": 'The "year" must be a valid 4-digit year',
        }),
        imageLink: celebrate_1.Joi.string().required().custom(validateURL).messages({
            "string.empty": 'The "imageLink" must be provided',
            "string.uri": 'The "imageLink" must be a valid URL',
        }),
        link: celebrate_1.Joi.string().optional().custom(validateURL).messages({
            "string.uri": 'The "link" must be a valid URL',
        }),
    }),
});
