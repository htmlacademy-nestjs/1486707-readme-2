import { LinkArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class LinkDataEntity
  implements LinkArticleData, Entity<string, LinkArticleData>
{
  public id?: string;
  public link: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: LinkArticleData) {
    this.id = data.id ?? '';
    this.link = data.link;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): LinkArticleData {
    return {
      id: this.id,
      link: this.link,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public fromObject(data: LinkArticleData): LinkDataEntity {
    return new LinkDataEntity().populate(data);
  }
}
