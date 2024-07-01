import { TextArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class TextDataEntity
  implements TextArticleData, Entity<string, TextArticleData>
{
  public id?: string;
  public title: string;
  public text: string;
  public preview: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: TextArticleData) {
    this.id = data.id;
    this.title = data.title;
    this.text = data.text;
    this.preview = data.preview;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): TextArticleData {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      preview: this.preview,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: TextArticleData): TextDataEntity {
    return new TextDataEntity().populate(data);
  }
}
