import { Injectable } from '@nestjs/common';
import { ArticleType } from '@prisma/client';
import { ArticleData } from '@project/shared/app/types';
import { Expose } from 'class-transformer';

@Injectable()
export class ArticleRdo {
  @Expose()
  public id: string;

  @Expose()
  public authorId: string;

  @Expose()
  public type: ArticleType;

  @Expose()
  public tags?: string[];

  @Expose()
  public articleData: ArticleData;

  @Expose()
  public likes?: string[];

  @Expose()
  public comments: Comment[];

  @Expose()
  public isRepost: boolean;
}
