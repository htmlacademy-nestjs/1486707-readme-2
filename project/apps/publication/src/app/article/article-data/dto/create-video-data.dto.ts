import Joi from 'joi';

export class CreateVideoArticleDto {
  public title: string;
  public link: string;
  public video: string;
}

export const createVideoArticleDtoSchema = Joi.object({
  title: Joi.string().min(20).max(50).required(),
  link: Joi.string().pattern(/^https:\/\/www\.youtube\.com\/watch\?v=/).required(),
  video: Joi.string().required(),
}).options({ abortEarly: false });
