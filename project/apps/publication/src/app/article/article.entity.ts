import {
  Article,
  ArticleData,
  ArticleDataIds,
  ArticleType,
} from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleLikesEntity } from '../article-likes/article-likes.entity';
import { CommentEntity } from '../comment/comment.entity';

export class ArticleEntity implements Article, Entity<string, Article> {
  public id?: string;
  public originalId?: string;
  public authorId: string;
  public originalAuthorId: string;
  public tags?: PublicationTagEntity[];
  public likes?: ArticleLikesEntity[];
  public type: ArticleType;
  public articleDataIds?: ArticleDataIds;
  public articleData?: ArticleData;
  public comments?: CommentEntity[];
  public isRepost: boolean;
  public publishedAt: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Article) {
    this.id = data.id;
    this.originalId = data.originalId || data.id;
    this.authorId = data.authorId;
    this.originalAuthorId = data.originalAuthorId;
    this.tags = data.tags.map((tag) => PublicationTagEntity.fromObject(tag));
    this.likes = data.likes.map((like) => ArticleLikesEntity.fromObject(like));
    this.type = data.type;
    this.articleDataIds = data.articleDataIds;
    this.articleData = data.articleData;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
    this.isRepost = data.isRepost;
    this.publishedAt = data.publishedAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): Article {
    return {
      id: this.id,
      originalId: this.originalId,
      authorId: this.authorId,
      originalAuthorId: this.originalAuthorId,
      tags: this.tags?.map((tagEntity) => tagEntity.toPOJO()) || [],
      likes: this.likes?.map((likeEntity) => likeEntity.toPOJO()) || [],
      type: this.type,
      articleData: this.articleData,
      articleDataIds: this.articleDataIds,
      comments:
        this.comments?.map((commentEntity) => commentEntity.toPOJO()) || [],
      isRepost: this.isRepost,
      publishedAt: this.publishedAt,
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
    entity.originalId = entity.id;
    entity.authorId = dto.authorId;
    entity.originalAuthorId = dto.authorId;
    entity.articleDataIds = articleDataIds;
    entity.tags = tags;
    entity.type = dto.type;
    entity.isRepost = false;
    entity.publishedAt = new Date();
    entity.comments = [];

    return entity;
  }
}
