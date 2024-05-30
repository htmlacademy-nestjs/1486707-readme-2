import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import Joi from 'joi';

export class ChangePasswordDto extends LoginUserDto {
  @ApiProperty({
    description: 'User new password',
    example: 'qwerty',
  })
  public newPassword: string;
}

export const changePasswordDtoSchema = Joi.object({
  newPassword: Joi.string().required(),
}).options({ abortEarly: false });
