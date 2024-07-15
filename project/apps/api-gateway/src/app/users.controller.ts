import { HttpService } from '@nestjs/axios';
import { Body, Controller, Patch, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';

import { LoginUserDto } from './dto/users/login-user.dto';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto } from './dto/users/create-user.dto';
import { ChangePasswordDto } from './dto/users/change-password.dto';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,
      createUserDto
    );
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/login`,
      loginUserDto
    );
    return data;
  }

  @Patch('change')
  public async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/change`,
      changePasswordDto
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
