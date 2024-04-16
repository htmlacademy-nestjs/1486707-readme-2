import { Article, ArticleData, ArticleType } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class ArticleEntity implements Article, Entity<string> {
  public id?: string;
  public authorId: string;
  public type: ArticleType;
  public tags?: string[];
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
  }

  public toPOJO() {
    return {
      authorId: this.authorId,
      type: this.type,
      tags: this.tags,
      data: this.data,
      isRepost: this.isRepost,
    };
  }
}
