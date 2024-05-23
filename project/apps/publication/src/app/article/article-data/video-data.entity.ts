import { VideoArticleData } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class VideoDataEntity
  implements VideoArticleData, Entity<string, VideoArticleData>
{
  public id?: string;
  public title: string;
  public link: string;
  public video: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: VideoArticleData) {
    this.id = data.id ?? '';
    this.title = data.title;
    this.link = data.link;
    this.video = data.video;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    return this;
  }

  public toPOJO(): VideoArticleData {
    return {
      id: this.id,
      title: this.title,
      link: this.link,
      video: this.video,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public fromObject(data: VideoArticleData): VideoDataEntity {
    return new VideoDataEntity().populate(data);
  }
}
