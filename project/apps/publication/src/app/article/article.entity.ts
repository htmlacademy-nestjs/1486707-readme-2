import {
  Article,
  ArticleData,
  ArticleDataIds,
  ArticleType,
  Comment,
} from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleLikesEntity } from '../article-likes/article-likes.entity';

export class ArticleEntity implements Article, Entity<string, Article> {
  public id?: string;
  public authorId: string;
  public tags?: PublicationTagEntity[];
  public likes?: ArticleLikesEntity[];
  public type: ArticleType;
  public articleDataIds?: ArticleDataIds;
  public articleData?: ArticleData;
  public comments?: Comment[];
  public isRepost: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Article) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.tags = data.tags.map((tag) => PublicationTagEntity.fromObject(tag));
    this.likes = data.likes.map((like) => ArticleLikesEntity.fromObject(like));
    this.type = data.type;
    this.articleDataIds = data.articleDataIds;
    this.articleData = data.articleData;
    this.comments = data.comments;
    this.isRepost = data.isRepost;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Article {
    return {
      id: this.id,
      authorId: this.authorId,
      tags: this.tags?.map((tagEntity) => tagEntity.toPOJO()) || [],
      likes: this.likes?.map((likeEntity) => likeEntity.toPOJO()) || [],
      type: this.type,
      articleData: this.articleData,
      articleDataIds: this.articleDataIds,
      comments: this.comments,
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
    tags: PublicationTagEntity[],
    articleDataIds: ArticleDataIds
  ): ArticleEntity {
    const entity = new ArticleEntity();
    entity.authorId = dto.authorId;
    entity.articleDataIds = articleDataIds;
    entity.tags = tags;
    entity.type = dto.type;
    entity.isRepost = false;

    return entity;
  }
}
