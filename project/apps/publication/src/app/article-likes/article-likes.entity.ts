import { Entity } from '@project/shared/core';
import { ArticleLikes } from '@project/shared/app/types';

export class ArticleLikesEntity
  implements ArticleLikes, Entity<string, ArticleLikes>
{
  public articleId: string;
  public authorId: string;

  public populate(data: ArticleLikes) {
    this.articleId = data.articleId;
    this.authorId = data.authorId;

    return this;
  }

  public toPOJO(): ArticleLikes {
    return {
      articleId: this.articleId,
      authorId: this.authorId,
    };
  }

  static fromObject(data: ArticleLikes): ArticleLikesEntity {
    return new ArticleLikesEntity().populate(data);
  }
}
