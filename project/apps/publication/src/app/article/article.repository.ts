import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { ArticleEntity } from './article.entity';
import { PrismaClientService } from '@project/shared/publication/models';
import { Article } from '@project/shared/app/types';
import { articleFilterToPrismaFilter } from './article.filter';
import { ARTICLE_LIMIT } from './article.constants';
import { ArticleQuery } from './article.types';

@Injectable()
export class ArticleRepository extends BasePostgresRepository<
  ArticleEntity,
  Article
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, ArticleEntity.fromObject);
  }

  public async findById(id: string): Promise<ArticleEntity> {
    const document = await this.client.article.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        articleDataIds: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async save(entity: ArticleEntity): Promise<ArticleEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.article.create({
      data: {
        ...pojoEntity,
        articleDataIds: {
          create: {
            ...pojoEntity.articleDataIds,
          },
        },
        comments: {
          create: pojoEntity.comments,
        },
        likes: {
          create: [],
        },
        tags: {
          connect: pojoEntity.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        articleDataIds: true,
        comments: true,
        likes: true,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async update(
    id: string,
    entity: ArticleEntity
  ): Promise<ArticleEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedArticle = await this.client.article.update({
      where: { id },
      data: {
        id,
        type: pojoEntity.type,
        authorId: pojoEntity.authorId,
        isRepost: pojoEntity.isRepost,
        articleDataIds: {
          update: pojoEntity.articleDataIds,
        },
        tags: {
          set: pojoEntity.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        articleDataIds: true,
        tags: true,
        comments: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(updatedArticle);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.article.delete({
      where: { id },
    });
  }

  public async find(query: ArticleQuery): Promise<ArticleEntity[]> {
    const { filter, take } = query;
    const where = filter ?? articleFilterToPrismaFilter(filter);

    const documents = await this.client.article.findMany({
      where,
      take: take ?? ARTICLE_LIMIT,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }
}
