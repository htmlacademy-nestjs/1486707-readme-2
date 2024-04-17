import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class ChangePasswordDto extends LoginUserDto {
  @ApiProperty({
    description: 'User new password',
    example: 'qwerty',
  })
  public newPassword: string;
}
