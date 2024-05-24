import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { QuoteArticleData } from '@project/shared/app/types';
import { QuoteDataEntity } from './quote-data.entity';

@Injectable()
export class QuoteDataRepository extends BasePostgresRepository<
  QuoteDataEntity,
  QuoteArticleData
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, QuoteDataEntity.fromObject);
  }

  public async save(entity: QuoteDataEntity): Promise<QuoteDataEntity> {
    const record = await this.client.quoteData.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<QuoteDataEntity> {
    const document = await this.client.quoteData.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: QuoteDataEntity
  ): Promise<QuoteDataEntity> {
    const updatedDocument = await this.client.quoteData.update({
      where: { id },
      data: {
        text: entity.text,
        quoteAuthor: entity.quoteAuthor
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.quoteData.delete({
      where: {
        id,
      },
    });
  }
}
