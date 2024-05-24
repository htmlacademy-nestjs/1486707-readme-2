import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { TextArticleData } from '@project/shared/app/types';
import { TextDataEntity } from './text-data.entity';

@Injectable()
export class TextDataRepository extends BasePostgresRepository<
  TextDataEntity,
  TextArticleData
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, TextDataEntity.fromObject);
  }

  public async save(entity: TextDataEntity): Promise<TextDataEntity> {
    const record = await this.client.textData.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<TextDataEntity> {
    const document = await this.client.textData.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: TextDataEntity
  ): Promise<TextDataEntity> {
    const updatedDocument = await this.client.textData.update({
      where: { id },
      data: {
        text: entity.text
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.textData.delete({
      where: {
        id,
      },
    });
  }
}
