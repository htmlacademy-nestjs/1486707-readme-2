import { LoginUserDto, loginUserDtoSchema } from './dto/login-user.dto';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto';
import {
  ChangePasswordDto,
  changePasswordDtoSchema,
} from './dto/change-password.dto';
import { ValidatorPipe } from '@project/shared/core';

export class LoginUserValidatorPipe extends ValidatorPipe<
  LoginUserDto,
  LoginUserDto
> {
  constructor() {
    super(loginUserDtoSchema);
  }
}

export class CreateUserValidatorPipe extends ValidatorPipe<
  CreateUserDto,
  CreateUserDto
> {
  constructor() {
    super(createUserDtoSchema);
  }
}

export class ChangePasswordValidatorPipe extends ValidatorPipe<
  ChangePasswordDto,
  ChangePasswordDto
> {
  constructor() {
    super(changePasswordDtoSchema);
  }
}
