import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/shared/publication/models';
import { ArticleLikesRepository } from './article-likes.repository';
import { ArticleLikesService } from './article-likes.service';

@Module({
  imports: [PrismaClientModule],
  providers: [ArticleLikesRepository, ArticleLikesService],
  controllers: [],
  exports: [ArticleLikesService],
})
export class ArticleLikesModule {}
