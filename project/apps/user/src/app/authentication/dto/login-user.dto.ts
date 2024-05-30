import { ApiProperty } from '@nestjs/swagger';
import Joi from 'joi';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
  })
  public password: string;
}

export const loginUserDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });
