import Joi from 'joi';

export class CreateVideoArticleDto {
  public title: string;
  public link: string;
  public video: string;
}

export const createVideoArticleDtoSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  video: Joi.string().required(),
}).options({ abortEarly: false });
