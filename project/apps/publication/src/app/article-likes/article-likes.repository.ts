import { Injectable, NotFoundException } from '@nestjs/common';
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
  public async findById(id: string): Promise<ArticleLikesEntity> {
      const document = await this.client.articleLikes.findFirst({
        where: { articleId: id }
      })

      if (!document) {
        throw new NotFoundException(`There are no article likes record for the ${id} id article`)
      }

      return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: ArticleLikesEntity
  ): Promise<ArticleLikesEntity> {
    const articleLikes = await this.client.articleLikes.findFirst({
        where: { articleId: id }
    })

    const newEntity = articleLikes;

    if (articleLikes.authorId.includes(entity.authorId[0])) {
        newEntity.authorId = newEntity.authorId.filter((author) => author !== entity.authorId[0])
    } else {
        newEntity.authorId.push(entity.authorId[0]);
    }


    const updatedArticleLikes = await this.client.articleLikes.upsert({
      where: { articleId: id },
      update: newEntity,
      create: newEntity,
    });

    return this.createEntityFromDocument(updatedArticleLikes);
  }
}
