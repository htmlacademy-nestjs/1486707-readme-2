import { Injectable } from '@nestjs/common';
import { VideoArticleData } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publication/models';
import { VideoDataEntity } from './video-data.entity';

@Injectable()
export class VideoDataRepository extends BasePostgresRepository<
  VideoDataEntity,
  VideoArticleData
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, VideoDataEntity.fromObject);
  }

  public async save(entity: VideoDataEntity): Promise<VideoDataEntity> {
    const record = await this.client.videoData.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<VideoDataEntity> {
    const document = await this.client.videoData.findFirst({
      where: {
        id,
      },
    });

    return this.createEntityFromDocument(document);
  }

  public async update(
    id: string,
    entity: VideoDataEntity
  ): Promise<VideoDataEntity> {
    const updatedDocument = await this.client.videoData.update({
      where: { id },
      data: {
        video: entity.video,
        link: entity.link,
        title: entity.title,
      },
    });

    return this.createEntityFromDocument(updatedDocument);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.videoData.delete({
      where: {
        id,
      },
    });
  }
}
