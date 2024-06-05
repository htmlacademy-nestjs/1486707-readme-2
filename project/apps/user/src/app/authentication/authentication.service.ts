import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthorRepository } from '../author/author.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Token, TokenPayload, User, UserRole } from '@project/shared/app/types';
import {
  AUTH_TOKEN_CREATION_ERROR,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentication.constants';
import { AuthorEntity } from '../author/author.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly jwtService: JwtService
  ) {}

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

    await this.authorRepository.update(user.id, user);
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      throw new HttpException(
        AUTH_TOKEN_CREATION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
