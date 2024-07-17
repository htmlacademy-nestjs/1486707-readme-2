import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Unique tag name',
    example: 'abcdef',
  })
  public title: string;
}
