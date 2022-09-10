import joi from 'joi';

export const safeNoteSchema = joi.object({
  title: joi.string().min(1).max(50).required(),
  description: joi.string().min(1).max(1000).required()
});
 