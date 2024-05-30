import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class UpdateArticleLikesDto {
  @ApiProperty({
    description: 'Publication id which the like relates to',
    example: 'a12',
  })
  public articleId: string;

  @ApiProperty({
    description: 'Author id which the like relates to',
    example: 'a12',
  })
  public authorId: string;
}

export const updateArticleLikesDtoSchema = Joi.object({
  articleId: Joi.string().required(),
  authorId: Joi.string().required(),
}).options({ abortEarly: false });
