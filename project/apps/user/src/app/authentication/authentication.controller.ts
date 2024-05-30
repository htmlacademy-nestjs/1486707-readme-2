import { Controller, Body, Post, HttpStatus, Patch } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/helpers';
import { AuthorRdo } from '../author/rdo/author.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordValidatorPipe,
  CreateUserValidatorPipe,
  LoginUserValidatorPipe,
} from './authentication.validation.pipeline';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new user has been successfully created',
  })
  @Post('register')
  public async create(@Body(new CreateUserValidatorPipe()) dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(AuthorRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'The user has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body(new LoginUserValidatorPipe()) dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The password is successfully changed',
  })
  @Patch('change')
  public async changePassword(
    @Body(new ChangePasswordValidatorPipe()) dto: ChangePasswordDto
  ) {
    await this.authService.changePassword(dto);
  }
}
