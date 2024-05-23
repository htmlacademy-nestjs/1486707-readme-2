import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { ArticleEntity } from './article.entity';
import { PrismaClientService } from '@project/shared/publication/models';
import { Article } from '@project/shared/app/types';

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

    if (!document) {
      throw new NotFoundException(`Article with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async save(entity: ArticleEntity): Promise<ArticleEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.article.create({
      data: {
        ...pojoEntity,
        articleDataIds: {
          create: pojoEntity.articleDataIds,
        },
        likes: {
          create: pojoEntity.likes,
        },
        comments: {
          create: pojoEntity.comments,
        },
        tags: {
          connect: pojoEntity.tags.map(({ id }) => ({ id })),
        },
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
        ...pojoEntity,
        articleDataIds: {
          update: pojoEntity.articleDataIds,
        },
        likes: {
          update: pojoEntity.likes,
        },
        comments: {},
        tags: {
          set: pojoEntity.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        tags: true,
        articleDataIds: true,
        likes: true
      },
    });

    return this.createEntityFromDocument(updatedArticle);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.article.delete({
      where: { id },
    });
  }
}
