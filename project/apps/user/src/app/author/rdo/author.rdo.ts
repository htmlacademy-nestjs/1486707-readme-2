import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Injectable()
export class AuthorRdo {
  @ApiProperty({
    description: 'User unique email',
    example: 'qwerty',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Default-name',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User subscriptions',
    example: '[id12, id23, id34]',
  })
  @Expose()
  public subscriptions: string[];
}
