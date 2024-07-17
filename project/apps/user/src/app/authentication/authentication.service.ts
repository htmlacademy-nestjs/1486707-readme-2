import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AuthorRepository } from '../author/author.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Token, User, UserRole } from '@project/shared/app/types';
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
import { jwtConfig } from '@project/shared/config/user';
import { ConfigType } from '@nestjs/config';
import { createJWTPayload } from '@project/shared/helpers';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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

    const newUser = await this.authorRepository.save(userEntity);

    return newUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.authorRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const doesPasswordMatch = await existUser.comparePasswords(password);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.authorRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordDto) {
    const { email, password, newPassword } = dto;
    const user = await this.verifyUser({ email, password });

    const updatedUser = await user.setPassword(newPassword);

    const updatedEntity = await this.authorRepository.update(
      user.id,
      updatedUser
    );

    return updatedEntity;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(
        AUTH_TOKEN_CREATION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
