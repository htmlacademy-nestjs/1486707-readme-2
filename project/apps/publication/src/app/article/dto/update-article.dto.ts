import { ArticleData, ArticleType } from '@project/shared/app/types';
import Joi from 'joi';
import { createLinkArticleDtoSchema } from '../article-data/dto/create-link-data.dto';
import { createPhotoArticleDtoSchema } from '../article-data/dto/create-photo-data.dto';
import { createQuoteArticleDtoSchema } from '../article-data/dto/create-quote-data.dto';
import { createTextArticleDtoSchema } from '../article-data/dto/create-text-data.dto';
import { createVideoArticleDtoSchema } from '../article-data/dto/create-video-data.dto';
import { ArticleTypes } from '../article.constants';
import { ValidateViaJoi } from '@project/shared/core';

export const updateArticleDtoSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.values(ArticleTypes)),
  authorId: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  isRepost: Joi.boolean,
  articleData: Joi.alternatives()
    .conditional('type', {
      switch: [
        {
          is: ArticleTypes.VIDEO,
          then: createVideoArticleDtoSchema,
        },
        {
          is: ArticleTypes.LINK,
          then: createLinkArticleDtoSchema,
        },
        {
          is: ArticleTypes.TEXT,
          then: createTextArticleDtoSchema,
        },
        {
          is: ArticleTypes.QUOTE,
          then: createQuoteArticleDtoSchema,
        },
        {
          is: ArticleTypes.PHOTO,
          then: createPhotoArticleDtoSchema,
        },
      ],
    })
    .required(),
}).options({ abortEarly: false });

@ValidateViaJoi(updateArticleDtoSchema)
export class UpdateArticleDto {
  public type: ArticleType;
  public authorId: string;
  public tags?: string[];
  public isRepost?: boolean;
  public articleData: ArticleData;
}
