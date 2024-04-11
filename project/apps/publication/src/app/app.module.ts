import { Module } from '@nestjs/common';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [],
  controllers: [ArticleController, CommentController],
  providers: [ArticleService, CommentService],
})
export class AppModule {}
