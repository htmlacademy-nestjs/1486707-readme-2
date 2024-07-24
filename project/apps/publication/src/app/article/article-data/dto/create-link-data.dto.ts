import Joi from 'joi';

export class CreateLinkArticleDto {
  public link: string;
  public description?: string;
}

export const createLinkArticleDtoSchema = Joi.object({
  link: Joi.string().required(),
  description: Joi.string().max(300),
}).options({ abortEarly: false });
