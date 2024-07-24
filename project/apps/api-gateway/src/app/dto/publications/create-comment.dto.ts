import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Publication id which the comment relates to',
    example: 'a12',
  })
  public articleId: string;

  @ApiProperty({
    description: 'User id who wrote the comment',
    example: 'a12',
  })
  public authorId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'abcde1234567',
  })
  public text: string;
}
