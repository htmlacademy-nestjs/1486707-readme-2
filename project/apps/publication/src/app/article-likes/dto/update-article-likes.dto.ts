import { ApiProperty } from '@nestjs/swagger';
import { ValidateViaJoi } from '@project/shared/core';
import Joi from 'joi';

export const updateArticleLikesDtoSchema = Joi.object({
  articleId: Joi.string().required(),
  authorId: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(updateArticleLikesDtoSchema)
export class UpdateArticleLikesDto {
  @ApiProperty({
    description: 'Article id which the like relates to',
    example: 'a12',
  })
  public articleId: string;

  @ApiProperty({
    description: 'Author id which the like relates to',
    example: 'a12',
  })
  public authorId: string;
}
