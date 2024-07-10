import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'User unique id',
    example: 'a12',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'qwerty',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'access token',
    example: 'user@user.local',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'refresh token',
    example: 'user@user.local',
  })
  @Expose()
  public refreshToken: string;
}
