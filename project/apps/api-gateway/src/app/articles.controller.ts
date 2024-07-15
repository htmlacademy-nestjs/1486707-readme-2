import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';
import { HttpService } from '@nestjs/axios';

@Controller('articles')
@UseFilters(AxiosExceptionFilter)
export class ArticlesController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreateArticleDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/`,
      dto
    );
    return data;
  }
}
