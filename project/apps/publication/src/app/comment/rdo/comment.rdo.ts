import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Injectable()
export class CommentRdo {
  @ApiProperty({
    description: 'Comment unique id',
    example: 'a12',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Publication id which the comment relates to',
    example: 'a12',
  })
  @Expose()
  public articleId: string;

  @ApiProperty({
    description: 'User id who wrote the comment',
    example: 'a12',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'abcde1234567',
  })
  @Expose()
  public text: string;
}
