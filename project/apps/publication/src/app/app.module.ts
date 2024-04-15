import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ArticleModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
