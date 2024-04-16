import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRdo } from './rdo/article.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiResponse({
    type: ArticleRdo,
    status: HttpStatus.OK,
    description: 'Comments found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const article = await this.articleService.getArticle(id);
    return fillDto(ArticleRdo, article.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new comment has been successfully created',
  })
  @Post('create')
  public async create(@Body() dto: CreateArticleDto) {
    const newComment = await this.articleService.saveArticle(dto);
    return fillDto(ArticleRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication comments are deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    this.articleService.deleteArticle(id);
  }
}
