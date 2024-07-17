import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { ArticleEntity } from './article.entity';
import { PrismaClientService } from '@project/shared/publication/models';
import {
  Article,
  ArticleQuery,
  ArticleSortType,
} from '@project/shared/app/types';
import { articleFilterToPrismaFilter } from './article.filter';
import { ARTICLE_LIMIT } from './article.constants';
import { articleSortToPrismaSort } from './article.sort';

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
        originalAuthorId: pojoEntity.authorId,
        articleDataIds: {
          create: {
            ...pojoEntity.articleDataIds,
          },
        },
        comments: {
          create: pojoEntity.comments,
        },
        likes: {
          create: pojoEntity.likes,
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
    entity.originalId = record.id;
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
        publishedAt: new Date(),
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
    const {
      filterByType,
      filterByAuthor,
      filterByTags,
      take,
      page,
      sortByType,
      sortDirection,
    } = query;
    const skip = page && take ? (page - 1) * take : undefined;
    const where =
      (filterByType || filterByAuthor || filterByTags) &&
      articleFilterToPrismaFilter({
        filterByType,
        filterByAuthor,
        filterByTags,
      });
    const orderBy = sortByType
      ? articleSortToPrismaSort(sortByType, sortDirection)
      : articleSortToPrismaSort(ArticleSortType.DATE);

    const documents = await this.client.article.findMany({
      where,
      take: take ?? ARTICLE_LIMIT,
      skip,
      orderBy,
      include: {
        comments: true,
        likes: true,
        tags: true,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async search({ search }: ArticleQuery): Promise<ArticleEntity[]> {
    const documents = await this.client.article.findMany({
      where: {
        articleDataIds: {
          OR: [
            {
              videoData: {
                title: {
                  contains: search,
                },
              },
            },
            {
              textData: {
                title: {
                  contains: search,
                },
              },
            },
          ],
        },
      },
      include: {
        comments: true,
        likes: true,
        tags: true,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async repostArticle(
    authorId: string,
    articleId: string
  ): Promise<ArticleEntity | null> {
    const article = await this.client.article.findFirst({
      where: {
        id: articleId,
      },
      include: {
        tags: true,
        comments: true,
        articleDataIds: true,
        likes: true,
      },
    });

    if (!article) {
      return null;
    }

    article.originalId = article.id;
    delete article.id;

    const repostedArticle = await this.client.article.create({
      data: {
        ...article,
        authorId,
        publishedAt: new Date(),
        isRepost: true,
        articleDataIds: {
          connect: { id: article.articleDataIds?.id },
        },
        comments: {
          create: [],
        },
        likes: {
          create: [],
        },
        tags: {
          connect: article.tags.map(({ id }) => ({ id })),
        },
      },
      include: {
        articleDataIds: true,
        tags: true,
        comments: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(repostedArticle);
  }

  public async getLatestArticles(checkDate: Date): Promise<ArticleEntity[]> {
    const documents = await this.client.article.findMany({
      where: {
        publishedAt: {
          gte: checkDate,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        articleDataIds: true,
        comments: true,
        likes: true,
        tags: true,
      },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }
}
