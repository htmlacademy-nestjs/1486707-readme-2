import {
  Article,
  ArticleDataIds,
  ArticleType,
} from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { CommentEntity } from '../comment/comment.entity';
import { ArticleLikesEntity } from '../article-likes/article-likes.entity';

export class ArticleEntity implements Article, Entity<string, Article> {
  public id?: string;
  public authorId: string;
  public tags?: PublicationTagEntity[];
  public likes?: ArticleLikesEntity;
  public type: ArticleType;
  public articleDataIds?: ArticleDataIds;
  public isRepost: boolean;
  public comments: CommentEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Article) {
    this.id = data.id ?? '';
    this.authorId = data.authorId;
    this.tags = data.tags.map((tag) => PublicationTagEntity.fromObject(tag));
    this.likes = ArticleLikesEntity.fromObject(data.likes);
    this.type = data.type;
    this.articleDataIds = data.articleDataIds;
    this.isRepost = data.isRepost;
    this.comments = data.comments.map((comment) =>
      CommentEntity.fromObject(comment)
    );
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
      articleDataIds: this.articleDataIds,
      isRepost: this.isRepost,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
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
  ): ArticleEntity {
    const entity = new ArticleEntity();
    entity.authorId = dto.authorId;
    entity.tags = tags;
    entity.type = dto.type;
    entity.isRepost = false;
    entity.comments = [];

    return entity;
  }
}
