import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

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

export const createCommentDtoSchema = Joi.object({
  articleId: Joi.string().required(),
  authorId: Joi.string().required(),
  text: Joi.string().required(),
}).options({ abortEarly: false });
