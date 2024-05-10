import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { PublicationTagModule } from './publication-tag/publication-tag.module';

@Module({
  imports: [ArticleModule, CommentModule, PublicationTagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
