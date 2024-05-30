import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'abcdef',
  })
  public title: string;
}

export const updateTagDtoSchema = Joi.object({
  title: Joi.string().required(),
}).options({ abortEarly: false });
