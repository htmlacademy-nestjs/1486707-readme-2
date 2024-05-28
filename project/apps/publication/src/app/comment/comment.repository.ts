import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/publication/models';

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, CommentEntity.fromObject);
  }

  public async findById(id: string): Promise<CommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: {
        text: entity.text,
        authorId: entity.authorId,
        articleId: entity.articleId,
      },
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
    entity.updatedAt = record.updatedAt;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findByArticleId(articleId: string): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        articleId,
      },
    });

    if (!records?.length) {
      return [];
    }

    const comments = records.map((record) =>
      this.createEntityFromDocument(record)
    );
    return comments;
  }
}
