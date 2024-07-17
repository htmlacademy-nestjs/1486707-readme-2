import Joi from 'joi';

export class CreateTextArticleDto {
  public title: string;
  public text: string;
  public preview?: string;
}

export const createTextArticleDtoSchema = Joi.object({
  title: Joi.string().min(20).max(50).required(),
  text: Joi.string().min(100).max(1024).required(),
  preview: Joi.string().min(50).max(225).required(),
}).options({ abortEarly: false });
