import Joi from 'joi';

export class CreateTextArticleDto {
  public text: string;
  public preview?: string;
}

export const createTextArticleDtoSchema = Joi.object({
  text: Joi.string().required(),
  preview: Joi.string(),
}).options({ abortEarly: false });
