import { ArticleData, ArticleType } from '@project/shared/app/types';
import Joi from 'joi';
import { ArticleTypes } from '../article.constants';
import { createVideoArticleDtoSchema } from '../article-data/dto/create-video-data.dto';
import { createLinkArticleDtoSchema } from '../article-data/dto/create-link-data.dto';
import { createPhotoArticleDtoSchema } from '../article-data/dto/create-photo-data.dto';
import { createQuoteArticleDtoSchema } from '../article-data/dto/create-quote-data.dto';
import { createTextArticleDtoSchema } from '../article-data/dto/create-text-data.dto';

export class CreateArticleDto {
  public type: ArticleType;
  public authorId: string;
  public tags?: string[];
  public articleData: ArticleData;
}

export const createArticleDtoSchema = Joi.object({
  type: Joi.string().required().valid(...Object.values(ArticleTypes)),
  authorId: Joi.string(),
  tags: Joi.array().items(Joi.string()),
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
