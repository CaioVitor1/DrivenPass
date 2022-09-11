import joi from 'joi';

export const cardsSchema = joi.object({
    numberCard: joi.number().required(), 
    nameCard: joi.string().required(),
    cvc: joi.string().required(), 
    expirationDate: joi.string().required(), 
    password: joi.string().required(), 
    isVirtual: joi.boolean().required(), 
    type: joi.string().valid('credit', 'debit', 'credit/debit').required(), 
    title: joi.string().required()
});