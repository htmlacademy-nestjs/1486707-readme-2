import Joi from 'joi';

export class CreatePhotoArticleDto {
  public photo: string;
}

export const createPhotoArticleDtoSchema = Joi.object({
  photo: Joi.string().required(),
}).options({ abortEarly: false });
