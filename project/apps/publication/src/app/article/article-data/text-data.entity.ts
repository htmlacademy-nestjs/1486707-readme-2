import { TextArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class TextDataEntity
  implements TextArticleData, Entity<string, TextArticleData>
{
  public id?: string;
  public text: string;
  public preview: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: TextArticleData) {
    this.id = data.id ?? '';
    this.text = data.text;
    this.preview = data.preview;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): TextArticleData {
    return {
      id: this.id,
      text: this.text,
      preview: this.preview,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public fromObject(data: TextArticleData): TextDataEntity {
    return new TextDataEntity().populate(data);
  }
}
