import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { PublicationTagService } from '../publication-tag/publication-tag.service';
import { PublicationTagRepository } from '../publication-tag/publication-tag.repository';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { PrismaClientModule } from '@project/shared/publication/models';
import { CommentService } from '../comment/comment.service';
import { ArticleLikesRepository } from '../article-likes/article-likes.repository';
import { CommentRepository } from '../comment/comment.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleLikesService,
    PublicationTagService,
    PublicationTagRepository,
    ArticleRepository,
    ArticleLikesRepository,
    CommentRepository,
    CommentService,
  ],
  exports: [],
})
export class ArticleModule {}
