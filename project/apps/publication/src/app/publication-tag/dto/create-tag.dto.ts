import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class CreateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'abcdef',
  })
  public title: string;
}

export const createTagDtoSchema = Joi.object({
  title: Joi.string().required(),
}).options({ abortEarly: false });
