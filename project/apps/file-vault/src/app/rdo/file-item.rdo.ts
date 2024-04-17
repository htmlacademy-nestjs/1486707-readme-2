import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Injectable()
export class FileItemRdo {
  @ApiProperty({
    description: 'File unique id',
    example: 'a12',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'File data',
    example: 'abcde1234567',
  })
  @Expose()
  public data: string;
}
