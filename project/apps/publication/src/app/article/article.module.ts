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
import { LinkDataRepository } from './article-data/link-data.repository';
import { PhotoDataRepository } from './article-data/photo-data.repository';
import { QuoteDataRepository } from './article-data/quote-data.repository';
import { TextDataRepository } from './article-data/text-data.repository';
import { VideoDataRepository } from './article-data/video-data.repository';
import { ArticleMetaDataService } from './article-data/article-meta-data.service';

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
    LinkDataRepository,
    PhotoDataRepository,
    QuoteDataRepository,
    TextDataRepository,
    VideoDataRepository,
    ArticleMetaDataService,
  ],
  exports: [],
})
export class ArticleModule {}
