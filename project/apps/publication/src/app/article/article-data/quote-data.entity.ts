import { QuoteArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class QuoteDataEntity
  implements QuoteArticleData, Entity<string, QuoteArticleData>
{
  public id?: string;
  public text: string;
  public quoteAuthor: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: QuoteArticleData) {
    this.id = data.id ?? '';
    this.text = data.text;
    this.quoteAuthor = data.quoteAuthor;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): QuoteArticleData {
    return {
      id: this.id,
      text: this.text,
      quoteAuthor: this.quoteAuthor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public fromObject(data: QuoteArticleData): QuoteDataEntity {
    return new QuoteDataEntity().populate(data);
  }
}
