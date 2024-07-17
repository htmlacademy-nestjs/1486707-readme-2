import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CreateArticleDto } from './dto/publications/create-article.dto';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';
import { HttpService } from '@nestjs/axios';
import { ArticleQuery } from '@project/shared/app/types';
import { UpdateArticleDto } from './dto/publications/update-article.dto';
import { CreateTagDto } from './dto/publications/create-tag.dto';
import { UpdateTagDto } from './dto/publications/update-tag.dto';
import { CreateCommentDto } from './dto/publications/create-comment.dto';

@Controller('articles')
@UseFilters(AxiosExceptionFilter)
export class ArticlesController {
  constructor(private readonly httpService: HttpService) {}

  // @UseGuards(CheckAuthGuard)
  // @UseInterceptors(UserIdInterceptor)
  @Post('/create')
  public async create(@Body() dto: CreateArticleDto) {
    // dto.authorId = userId;
    const { data: articleData } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/create`,
      dto
    );
    return articleData;
  }

  // @UseInterceptors(UserIdInterceptor)
  @Post('/repost')
  public async repost(@Param('articleId') articleId: string) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/repost`,
      {
        // userId,
        articleId,
      }
    );
    return data;
  }

  @Get('/find')
  public async findArticles(@Query() query: ArticleQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/find`,
      {
        params: { ...query },
      }
    );
    return data;
  }

  @Get('/search')
  public async searchArticles(@Query() query: ArticleQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/search`,
      {
        params: { ...query },
      }
    );
    return data;
  }

  @Get('/:id')
  public async showArticle(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/${id}`
    );
    return data;
  }

  @Patch('/update/:id')
  public async updateArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Articles}/update/${id}`,
      dto
    );
    return data;
  }

  @Delete('/delete/:id')
  public async deleteArticle(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Articles}/delete/${id}`
    );
    return data;
  }

  // Tags
  @Post('/create-tag')
  public async createTag(@Body() dto: CreateTagDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Tags}/`,
      dto
    );
    return data;
  }

  @Get('/get-tag/:id')
  public async getTag(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Tags}/${id}`
    );
    return data;
  }

  @Patch('/update-tag/:id')
  public async updateTag(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Tags}/${id}`,
      dto
    );
    return data;
  }

  @Delete('/delete-tag/:id')
  public async deleteTag(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Tags}/${id}`
    );
    return data;
  }

  // Comments
  @Post('create-comment')
  public async createComment(@Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Comments}/create`,
      dto
    );
    return data;
  }

  @Get('get-comments/:id')
  public async getComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Comments}/${id}`
    );
    return { data };
  }

  @Delete('delete-comment/:id')
  public async deleteComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Comments}/delete/${id}`
    );
    return data;
  }
}
