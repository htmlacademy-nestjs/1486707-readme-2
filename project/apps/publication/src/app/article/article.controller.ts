import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRdo } from './rdo/article.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleLikesService: ArticleLikesService
  ) {}

  @ApiResponse({
    type: ArticleRdo,
    status: HttpStatus.OK,
    description: 'Comments found',
  })
  @Get(':id')
  public async showArticles(@Param('id') id: string) {
    const article = await this.articleService.getArticle(id);
    return fillDto(ArticleRdo, article.toPOJO());
  }

  @Get('/like/:id')
  public async showArticleLikes(@Param('id') id: string) {
    return this.articleLikesService.getArticleLikes(id);
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
    description: 'Publication is deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    this.articleService.deleteArticle(id);
  }

  @Patch('/update/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto
  ) {
    const updatedArticle = await this.articleService.updateArticle(
      id,
      dto
    );
    return fillDto(ArticleRdo, updatedArticle.toPOJO());
  }
}
