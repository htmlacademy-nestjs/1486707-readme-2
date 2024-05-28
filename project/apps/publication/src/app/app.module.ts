import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { PublicationTagModule } from './publication-tag/publication-tag.module';
import { ArticleLikesModule } from './article-likes/artilce-likes.module';

@Module({
  imports: [
    ArticleModule,
    CommentModule,
    PublicationTagModule,
    ArticleLikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
