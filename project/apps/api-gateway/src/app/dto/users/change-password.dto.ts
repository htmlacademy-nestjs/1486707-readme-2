import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import Joi from 'joi';
import { ValidateViaJoi } from '@project/shared/core';

export const changePasswordDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(changePasswordDtoSchema)
export class ChangePasswordDto extends LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'a@a.com',
  })
  public email: string;

  @ApiProperty({
    description: 'User old password',
    example: 'qwerty',
  })
  public password: string;

  @ApiProperty({
    description: 'User new password',
    example: 'qwerty',
  })
  public newPassword: string;
}
