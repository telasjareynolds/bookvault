import { Joi, celebrate } from "celebrate";
import validator from "validator";

// Custom URL validation function
const validateURL = (value: string, helpers: any) => {
  if (validator.isURL(value)) return value;
  return helpers.error("string.uri");
};

// Validate user registration (signup)
export const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validate login
export const validateLoginAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validate book ID in params
export const validateBookId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().messages({
      "string.empty": 'The "id" param must be provided.',
    }),
  }),
});

// Validate book creation/editing
export const validateBookData = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().messages({
      "string.empty": 'The "_id" field must be filled in',
    }),
    title: Joi.string().required().min(2).messages({
      "string.min": 'The "title" must be at least 2 characters long.',
      "string.empty": 'The "title" field must be filled in',
    }),
    author: Joi.string().optional().allow(""),
    year: Joi.number().required().min(1000).max(9999).messages({
      "number.base": 'The "year" field must be a number',
      "number.min": 'The "year" must be a 4-digit year',
      "number.max": 'The "year" must be a valid 4-digit year',
    }),
    imageLink: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageLink" must be provided',
      "string.uri": 'The "imageLink" must be a valid URL',
    }),
    link: Joi.string().optional().custom(validateURL).messages({
      "string.uri": 'The "link" must be a valid URL',
    }),
    language: Joi.string().optional(),
    pages: Joi.number().optional(),
  }),
});
