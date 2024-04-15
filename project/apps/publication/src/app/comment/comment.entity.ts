import { Comment } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public text: string;
  public publicationId: string;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public populate(data: Comment) {
    this.text = data.text;
    this.publicationId = data.publicationId;
  }

  public toPOJO() {
    return {
      id: this.id,
      text: this.text,
      publicationId: this.publicationId,
    };
  }
}
