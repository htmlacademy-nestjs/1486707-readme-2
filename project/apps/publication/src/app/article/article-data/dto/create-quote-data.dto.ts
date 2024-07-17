import Joi from 'joi';

export class CreateQuoteArticleDto {
  public text: string;
  public quoteAuthor?: string;
}

export const createQuoteArticleDtoSchema = Joi.object({
  text: Joi.string().min(20).max(300).required(),
  quoteAuthor: Joi.string().min(3).max(50).required(),
}).options({ abortEarly: false });
