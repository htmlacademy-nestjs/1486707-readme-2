import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { PhotoArticleData } from '@project/shared/app/types';
import { PhotoDataEntity } from './photo-data.entity';

@Injectable()
export class PhotoDataRepository extends BasePostgresRepository<
  PhotoDataEntity,
  PhotoArticleData
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PhotoDataEntity.fromObject);
  }

  public async save(entity: PhotoDataEntity): Promise<PhotoDataEntity> {
    const record = await this.client.photoData.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PhotoDataEntity> {
    const document = await this.client.photoData.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: PhotoDataEntity
  ): Promise<PhotoDataEntity> {
    const updatedDocument = await this.client.photoData.update({
      where: { id },
      data: {
        photo: entity.photo
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.photoData.delete({
      where: {
        id,
      },
    });
  }
}
