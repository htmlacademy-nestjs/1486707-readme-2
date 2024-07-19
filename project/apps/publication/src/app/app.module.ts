import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { PublicationTagModule } from './publication-tag/publication-tag.module';
import { ArticleLikesModule } from './article-likes/artilce-likes.module';

import { ConfigUserModule } from '@project/shared/config/user';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ArticleModule,
    CommentModule,
    PublicationTagModule,
    ArticleLikesModule,
    ConfigUserModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
