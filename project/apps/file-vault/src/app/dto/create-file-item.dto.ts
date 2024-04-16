import { ApiProperty } from '@nestjs/swagger';

export class CreateFileItemDto {
  @ApiProperty({
    description: 'File item data',
    example: 'abcde1234567',
  })
  public data: string;
}
