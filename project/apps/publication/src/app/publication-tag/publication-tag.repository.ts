import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PublicationTagEntity } from './publication-tag.entity';
import { Tag } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/publication/models';

@Injectable()
export class PublicationTagRepository extends BasePostgresRepository<
  PublicationTagEntity,
  Tag
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationTagEntity.fromObject);
  }

  public async save(
    entity: PublicationTagEntity
  ): Promise<PublicationTagEntity> {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PublicationTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async findByTitle(title: string): Promise<PublicationTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        title,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: PublicationTagEntity
  ): Promise<PublicationTagEntity> {
    const updatedTag = await this.client.tag.update({
      where: { id },
      data: {
        title: entity.title,
      },
    });

    return this.createEntityFromDocument(updatedTag);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id,
      },
    });
  }

  public async findByIds(ids: string[]): Promise<PublicationTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
