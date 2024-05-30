import { ApiProperty } from "@nestjs/swagger";
import Joi from "joi";

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

export const createUserDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  avatar: Joi.string()
}).options({ abortEarly: false });