import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { PublicationTagService } from '../publication-tag/publication-tag.service';
import { PublicationTagRepository } from '../publication-tag/publication-tag.repository';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PublicationTagService, PublicationTagRepository, ArticleRepository],
  exports: [],
})
export class ArticleModule {}
