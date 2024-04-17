import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'User unique address',
        example: 'user@user.ru'
      })
    public email: string;

    @ApiProperty({
        description: 'User name',
        example: 'Default-name'
      })
    public name: string;

    @ApiProperty({
        description: 'User avatar',
        example: 'abcde1234'
      })
    public avatar: string;

    @ApiProperty({
        description: 'User password',
        example: 'qwerty'
      })
    public password: string;
}