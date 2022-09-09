import joi from 'joi';

export const credentialsSchema = joi.object({
  title: joi.string().required(),
  url: joi.string().required(),
  nameUser: joi.string().required(),
  passwordUser: joi.string().required()
});
 