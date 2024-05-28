import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { LinkArticleData } from '@project/shared/app/types';
import { LinkDataEntity } from './link-data.entity';

@Injectable()
export class LinkDataRepository extends BasePostgresRepository<
  LinkDataEntity,
  LinkArticleData
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, LinkDataEntity.fromObject);
  }

  public async save(entity: LinkDataEntity): Promise<LinkDataEntity> {
    const record = await this.client.linkData.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<LinkDataEntity> {
    const document = await this.client.linkData.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: LinkDataEntity
  ): Promise<LinkDataEntity> {
    const updatedDocument = await this.client.linkData.update({
      where: { id },
      data: {
        link: entity.link,
        description: entity.description,
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.linkData.delete({
      where: {
        id,
      },
    });
  }
}
