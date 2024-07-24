import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { ArticleLikes } from '@project/shared/app/types';
import { ArticleLikesEntity } from './article-likes.entity';

@Injectable()
export class ArticleLikesRepository extends BasePostgresRepository<
  ArticleLikesEntity,
  ArticleLikes
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, ArticleLikesEntity.fromObject);
  }
  public async findByArticleId(id: string): Promise<ArticleLikesEntity[]> {
    const documents = await this.client.articleLikes.findMany({
      where: { articleId: id },
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async updateArticleLikes(
    id: string,
    authorId: string
  ): Promise<ArticleLikesEntity[]> {
    const articleLikes = await this.client.articleLikes.findFirst({
      where: { articleId: id, authorId },
    });

    if (articleLikes) {
      await this.client.articleLikes.delete({
        where: {
          articleId_authorId: { articleId: id, authorId },
        },
      });
    } else {
      await this.client.articleLikes.create({
        data: {
          articleId: id,
          authorId,
        },
      });
    }

    const updatedArticleLikes = await this.findByArticleId(id);

    return updatedArticleLikes.map((like) => this.createEntityFromDocument(like));
  }
}
