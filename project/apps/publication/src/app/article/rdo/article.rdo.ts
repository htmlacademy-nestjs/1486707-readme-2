import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleType, ArticleData } from '@project/shared/app/types';
import { Expose } from 'class-transformer';

@Injectable()
export class ArticleRdo {
  @ApiProperty({
    description: 'Article unique id',
    example: 'a12',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Article author id',
    example: 'a12',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Article type',
    example: 'video',
  })
  @Expose()
  public type: ArticleType;

  @ApiProperty({
    description: 'Article tags list',
    example: '["tag1", "tag2", "tag3"]',
  })
  @Expose()
  public tags?: string[];

  @ApiProperty({
    description: 'Article content data',
    example: '{ text: "random text"; quoteAuthor: "abcdefg"; }',
  })
  @Expose()
  public data: ArticleData;

  @ApiProperty({
    description: 'Article repost flag',
    example: 'false',
  })
  @Expose()
  public isRepost: boolean;
}
