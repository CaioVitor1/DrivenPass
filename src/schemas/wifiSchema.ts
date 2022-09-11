import joi from 'joi';

export const wifiSchema = joi.object({
    title: joi.string().required(),
    nameWifi: joi.string().required(),
    passwordWifi: joi.string().required()
});
 

