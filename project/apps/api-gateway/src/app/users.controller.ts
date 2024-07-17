import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { LoginUserDto } from './dto/users/login-user.dto';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto } from './dto/users/create-user.dto';
import { ChangePasswordDto } from './dto/users/change-password.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    if (dto.avatar) {
      const { data: fileData } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload`,
        dto.avatar
      );

      dto.avatar = fileData.id;
    }

    const { data: userData } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,
      dto
    );

    return userData;
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

  @UseGuards(CheckAuthGuard)
  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`
    );

    const { data: articlesData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/find?filterByAuthor=${id}`
    );

    userData.articlesCount = articlesData.entities.length;

    if (userData.avatar) {
      const { data: fileData } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Files}/${userData.avatar}`
      );

      userData.avatar = fileData;
    }
    return userData;
  }
}
