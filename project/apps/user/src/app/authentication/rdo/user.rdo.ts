import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserRdo {
    @ApiProperty({
        description: 'User unique id',
        example: 'a12'
      })
    @Expose()
    public id: string;

    @ApiProperty({
        description: 'User avatar',
        example: 'abcde1234'
      })
    @Expose()
    public avatar: string;

    @ApiProperty({
        description: 'User unique email',
        example: 'qwerty'
      })
    @Expose()
    public email: string;

    @ApiProperty({
        description: 'User name',
        example: 'Default-name'
      })
    @Expose()
    public name: string;
}