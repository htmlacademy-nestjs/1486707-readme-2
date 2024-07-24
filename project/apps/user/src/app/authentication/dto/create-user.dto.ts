import { ApiProperty } from '@nestjs/swagger';
import { ValidateViaJoi } from '@project/shared/core';
import Joi from 'joi';

export const createUserDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
  name: Joi.string().min(3).max(50).required(),
  avatar: Joi.binary().max(500000),
}).options({ abortEarly: false });

@ValidateViaJoi(createUserDtoSchema)
export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Default-name',
  })
  public name: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'abcde1234',
  })
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  public password: string;
}
