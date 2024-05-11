import { Comment } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public articleId?: string;
  public authorId: string;
  public text: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public populate(data: Comment): void {
    this.id = data.id;
    this.articleId = data.articleId;
    this.authorId = data.authorId;
    this.text = data.text;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.articleId,
      articleId: this.articleId,
      authorId: this.authorId,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Comment): CommentEntity {
    return new CommentEntity(data);
  }
}
