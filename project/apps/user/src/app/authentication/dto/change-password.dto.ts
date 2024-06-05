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
    description: 'User new password',
    example: 'qwerty',
  })
  public newPassword: string;
}
