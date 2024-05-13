import { ApiProperty } from '@nestjs/swagger';
import { ArticleType } from '@project/shared/app/types';

export class UpdateArticleDto {
      @ApiProperty({
        description: 'Article author id',
        example: 'a12',
      })
      public authorId: string;
    
      @ApiProperty({
        description: 'Article tags list',
        example: '["tag1", "tag2", "tag3"]',
      })
      public tags?: string[];

      @ApiProperty({
        description: 'Article type',
        example: 'video',
      })
      public type: ArticleType;

      @ApiProperty({
        description: 'Article title',
        example: 'title1',
      })
      public title: string;

      @ApiProperty({
        description: 'Article link',
        example: 'link1',
      })
      public link: string;

      @ApiProperty({
        description: 'Article video',
        example: 'video1',
      })
      public video: string;

      @ApiProperty({
        description: 'Article text',
        example: 'text1',
      })
      public text: string;

      @ApiProperty({
        description: 'Article preview',
        example: 'preview1',
      })
      public preview: string;

      @ApiProperty({
        description: 'Article quote author',
        example: 'quoteAuthor1',
      })
      public quoteAuthor: string;

      @ApiProperty({
        description: 'Article photo',
        example: 'photo1',
      })
      public photo: string;

      @ApiProperty({
        description: 'Article description',
        example: 'description1',
      })
      public description: string;
}
