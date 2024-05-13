import { Article, ArticleType } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';

export class ArticleEntity implements Article, Entity<string, Article> {
  public id?: string;
  public authorId: string;
  public tags?: PublicationTagEntity[];
  public likes?: string[];
  public type: ArticleType;
  public title: string;
  public link: string;
  public video: string;
  public text: string;
  public preview: string;
  public quoteAuthor: string;
  public photo: string;
  public description?: string;
  public isRepost: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Article) {
    this.id = data.id ?? '';
    this.authorId = data.authorId;
    this.tags = data.tags.map((tag) => PublicationTagEntity.fromObject(tag));
    this.likes = data.likes;
    this.type = data.type;
    this.title = data.title;
    this.link = data.link;
    this.video = data.video;
    this.text = data.text;
    this.preview = data.preview;
    this.quoteAuthor = data.quoteAuthor;
    this.photo = data.photo;
    this.description = data.description;
    this.isRepost = data.isRepost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Article {
    return {
      authorId: this.authorId,
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
      likes: this.likes,
      type: this.type,
      title: this.title,
      link: this.link,
      video: this.video,
      text: this.text,
      preview: this.preview,
      quoteAuthor: this.quoteAuthor,
      photo: this.photo,
      description: this.description,
      isRepost: this.isRepost,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Article): ArticleEntity {
    return new ArticleEntity().populate(data);
  }

  static fromDto(
    dto: CreateArticleDto,
    tags: PublicationTagEntity[]
  ): ArticleEntity {
    const entity = new ArticleEntity();
    entity.authorId = dto.authorId;
    entity.tags = tags;
    entity.likes = [];
    entity.type = dto.type;
    entity.title = dto.title;
    entity.link = dto.link;
    entity.video = dto.video;
    entity.text = dto.text;
    entity.preview = dto.preview;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.photo = dto.photo;
    entity.description = dto.description;
    entity.isRepost = false;

    return entity;
  }
}
