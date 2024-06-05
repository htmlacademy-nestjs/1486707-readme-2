import Joi from 'joi';

export class CreateQuoteArticleDto {
  public text: string;
  public quoteAuthor?: string;
}

export const createQuoteArticleDtoSchema = Joi.object({
  text: Joi.string().required(),
  quoteAuthor: Joi.string(),
}).options({ abortEarly: false });
