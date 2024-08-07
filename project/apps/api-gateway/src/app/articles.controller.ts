import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import FormData from 'form-data';
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
import { ArticleTypes } from './api.constants';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('articles')
@UseFilters(AxiosExceptionFilter)
export class ArticlesController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('/create')
  public async create(
    @Body() dto: CreateArticleDto & { userId: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000 })],
        fileIsRequired: false,
      })
    )
    photoData: Express.Multer.File
  ) {
    dto['authorId'] = dto.userId;

    delete dto.userId;

    if (dto.type === ArticleTypes.PHOTO && photoData) {
      const formData = new FormData();
      formData.append('user', dto.userId);
      formData.append('file', photoData.buffer, {
        filename: photoData.originalname,
      });

      const { data: fileData } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Files}/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      dto.articleData = {
        ...dto.articleData,
        photo: fileData.id,
      };
    }

    const { data: articleData } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/create`,
      dto
    );
    return articleData;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/repost')
  public async repost(@Body() { userId, articleId }) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/repost`,
      {
        articleId,
        authorId: userId,
      }
    );
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/like/:id')
  public async likeArticle(@Param('id') id: string, @Body() { userId }) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/like`,
      {
        articleId: id,
        authorId: userId,
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

    if (data.type === ArticleTypes.PHOTO) {
      const { data: fileData } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Files}/${data.articleData.photo}`
      );

      data.articleData.photo = fileData;
    }

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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('/send-latest')
  public async sendLatestArticles(@Req() req: Request, @Body() { userId }) {
    const { data: userData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    const { data: subscriberData } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Notifications}/${userData.email}`
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Articles}/get-latest`,
      {
        subscriber: subscriberData,
      }
    );
  }

  @Get('/:id')
  public async showArticle(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/${id}`
    );

    if (data.type === ArticleTypes.PHOTO) {
      const { data: fileData } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Files}/${data.articleData.photo}`
      );

      data.articleData.photo = fileData;
    }

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/update/:id')
  public async updateArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto & { userId: string }
  ) {
    const { data: article } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/${id}`
    );

    if (article.authorId !== dto.userId) {
      throw new ForbiddenException(
        'This author cannot delete this publication'
      );
    }
    delete dto.userId;
    const { data: updatedData } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Articles}/update/${id}`,
      dto
    );
    return updatedData;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('/delete/:id')
  public async deleteArticle(@Param('id') id: string, @Body() { userId }) {
    const { data: article } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Articles}/${id}`
    );

    if (article.authorId !== userId) {
      throw new ForbiddenException(
        'This author cannot delete this publication'
      );
    }

    const { data: deletedData } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Articles}/delete/${id}`
    );
    return deletedData;
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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('delete-comment/:id')
  public async deleteComment(@Param('id') id: string, @Body() { userId }) {
    const { data: comment } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Comments}/get/${id}`
    );

    if (comment.authorId !== userId) {
      throw new ForbiddenException('The author cannot delete this comment');
    }

    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Comments}/delete/${id}`
    );
    return data;
  }
}
