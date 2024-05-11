import { Article, ArticleData, ArticleType, Tag } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class ArticleEntity implements Article, Entity<string, Article> {
  public id?: string;
  public authorId: string;
  public type: ArticleType;
  public tags?: Tag[];
  public data: ArticleData;
  public isRepost: boolean;

  constructor(article: Article) {
    this.populate(article);
  }

  public populate(data: Article) {
    this.authorId = data.authorId;
    this.type = data.type;
    this.tags = data.tags;
    this.data = data.data;
    this.isRepost = data.isRepost;
  }

  public toPOJO(): Article {
    return {
      authorId: this.authorId,
      type: this.type,
      tags: this.tags,
      data: this.data,
      isRepost: this.isRepost,
    };
  }

  static fromObject(data: Article): ArticleEntity {
    return new ArticleEntity(data);
  }
}
