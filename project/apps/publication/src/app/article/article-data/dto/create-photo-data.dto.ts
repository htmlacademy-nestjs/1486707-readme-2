import Joi from 'joi';

export class CreatePhotoArticleDto {
  public photo: string;
}

export const createPhotoArticleDtoSchema = Joi.object({
  photo: Joi.binary().max(1000000).required(),
}).options({ abortEarly: false });
