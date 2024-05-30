import { PipeTransform, BadRequestException } from '@nestjs/common';
import { LoginUserDto, loginUserDtoSchema } from './dto/login-user.dto';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

export class LoginUserValidatorPipe
  implements PipeTransform<LoginUserDto, LoginUserDto>
{
  public transform(query: LoginUserDto): LoginUserDto {
    const result = loginUserDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const loginUserValue = result.value;
    return loginUserValue;
  }
}

export class CreateUserValidatorPipe
  implements PipeTransform<CreateUserDto, CreateUserDto>
{
  public transform(query: CreateUserDto): CreateUserDto {
    const result = createUserDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const createUserValue = result.value;
    return createUserValue;
  }
}

export class ChangePasswordValidatorPipe
  implements PipeTransform<ChangePasswordDto, ChangePasswordDto>
{
  public transform(query: ChangePasswordDto): ChangePasswordDto {
    const result = createUserDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const changePasswordValue = result.value;
    return changePasswordValue;
  }
}
