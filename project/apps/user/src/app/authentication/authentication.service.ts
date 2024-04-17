import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthorRepository } from '../author/author.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@project/shared/app/types';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constants';
import { AuthorEntity } from '../author/author.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, name, password, avatar } = dto;

    const user = {
      email,
      name,
      password,
      role: UserRole.Author,
      avatar,
      passwordHash: '',
    };

    const existUser = await this.authorRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new AuthorEntity(user).setPassword(password);

    return this.authorRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.authorRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!(await existUser.comparePasswords(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordDto) {
    const user = await this.verifyUser(dto);

    const { newPassword } = dto;
    user.setPassword(newPassword);

    this.authorRepository.update(user.id, user);
  }
}
