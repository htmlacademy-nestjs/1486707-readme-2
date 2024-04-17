import { ApiProperty } from '@nestjs/swagger';
import { ArticleType, ArticleData } from '@project/shared/app/types';

export class CreateArticleDto {
      @ApiProperty({
        description: 'Article author id',
        example: 'a12',
      })
      public authorId: string;
    
      @ApiProperty({
        description: 'Article type',
        example: 'video',
      })
      public type: ArticleType;
    
      @ApiProperty({
        description: 'Article tags list',
        example: '["tag1", "tag2", "tag3"]',
      })
      public tags?: string[];
    
      @ApiProperty({
        description: 'Article content data',
        example: '{ text: "random text"; quoteAuthor: "abcdefg"; }',
      })
      public data: ArticleData;
}
