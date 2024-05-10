import { Tag } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class ArticleTagEntity implements Tag, Entity<string> {
  public id?;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? '';
    this.title = data.title;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}
