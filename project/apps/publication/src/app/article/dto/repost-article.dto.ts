import Joi from 'joi';
import { ValidateViaJoi } from '@project/shared/core';

export const updateArticleDtoSchema = Joi.object({
  articleId: Joi.string().required(),
  authorId: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(updateArticleDtoSchema)
export class RepostArticleDto {
  public articleId: string;
  public authorId: string;
}
