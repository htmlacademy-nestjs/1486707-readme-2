import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRdo } from './rdo/article.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JoiValidationPipe } from '@project/shared/core';
import { ArticleQuery } from '@project/shared/app/types';
import { RepostArticleDto } from './dto/repost-article.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleLikesService: ArticleLikesService
  ) {}

  @ApiResponse({
    type: ArticleRdo,
    status: HttpStatus.OK,
    description: 'Articles found',
  })
  @Get('/find')
  public async findArticles(@Query() query: ArticleQuery) {
    const articlesWithPagination = await this.articleService.getArticles(query);
    const result = {
      entities: articlesWithPagination.map((article) =>
        fillDto(ArticleRdo, article.toPOJO())
      ),
    };
    return result;
  }

  @ApiResponse({
    type: ArticleRdo,
    status: HttpStatus.OK,
    description: 'Articles found',
  })
  @Get('/search')
  public async search(@Query() query: ArticleQuery) {
    const articlesWithPagination = await this.articleService.searchTitles(
      query
    );
    const result = {
      entities: articlesWithPagination.map((article) =>
        fillDto(ArticleRdo, article.toPOJO())
      ),
    };
    return result;
  }

  @ApiResponse({
    type: ArticleRdo,
    status: HttpStatus.OK,
    description: 'Article found',
  })
  @Get('/:id')
  public async showArticles(@Param('id') id: string) {
    const article = await this.articleService.getArticle(id);
    return fillDto(ArticleRdo, article.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new comment has been successfully created',
  })
  @Post('/create')
  public async create(@Body(JoiValidationPipe) dto: CreateArticleDto) {
    const newComment = await this.articleService.saveArticle(dto);
    return fillDto(ArticleRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication is deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    this.articleService.deleteArticle(id);
  }

  @Patch('/update/:id')
  public async update(
    @Param('id') id: string,
    @Body(JoiValidationPipe) dto: UpdateArticleDto
  ) {
    const updatedArticle = await this.articleService.updateArticle(id, dto);
    return fillDto(ArticleRdo, updatedArticle.toPOJO());
  }

  @Post('/repost')
  public async repost(@Body(JoiValidationPipe) dto: RepostArticleDto) {
    const { articleId, authorId } = dto;
    const repostedArticle = await this.articleService.repostArticle(
      authorId,
      articleId
    );
    return repostedArticle;
  }
}
