import { HttpService } from '@nestjs/axios';
import 'multer';
import FormData from 'form-data';
import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 500000 })],
      })
    )
    avatar: Express.Multer.File
  ) {
    if (avatar) {
      const formData = new FormData();
      formData.append('email', dto.email);
      formData.append('name', dto.name);
      formData.append('file', avatar.buffer, { filename: avatar.originalname });

      const { data: fileData } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
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
