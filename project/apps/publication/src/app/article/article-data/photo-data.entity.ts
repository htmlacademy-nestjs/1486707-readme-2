import { PhotoArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class PhotoDataEntity
  implements PhotoArticleData, Entity<string, PhotoArticleData>
{
  public id?: string;
  public photo: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: PhotoArticleData) {
    this.id = data.id;
    this.photo = data.photo;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): PhotoArticleData {
    return {
      id: this.id,
      photo: this.photo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: PhotoArticleData): PhotoDataEntity {
    return new PhotoDataEntity().populate(data);
  }
}
