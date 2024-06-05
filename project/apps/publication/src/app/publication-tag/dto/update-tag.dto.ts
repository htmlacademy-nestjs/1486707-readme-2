import { ApiProperty } from '@nestjs/swagger';
import { ValidateViaJoi } from '@project/shared/core';
import Joi from 'joi';

export const updateTagDtoSchema = Joi.object({
  title: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(updateTagDtoSchema)
export class UpdateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'abcdef',
  })
  public title: string;
}
