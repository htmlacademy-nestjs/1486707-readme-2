import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto {
    @ApiProperty({
        description: 'Unique tag name',
        example: 'abcdef'
    })
    public title: string;
}