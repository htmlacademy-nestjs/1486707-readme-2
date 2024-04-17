import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [],
})
export class ArticleModule {}
