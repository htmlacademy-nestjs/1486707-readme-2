import { ApiProperty } from '@nestjs/swagger';
import { ValidateViaJoi } from '@project/shared/core';
import Joi from 'joi';

export const createTagDtoSchema = Joi.object({
  title: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(createTagDtoSchema)
export class CreateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'abcdef',
  })
  public title: string;
}
