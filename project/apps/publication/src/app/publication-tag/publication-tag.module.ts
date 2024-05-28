import { Module } from '@nestjs/common';
import { PublicationTagController } from './publication-tag.controller';
import { PublicationTagService } from './publication-tag.service';
import { PrismaClientModule } from '@project/shared/publication/models';
import { PublicationTagRepository } from './publication-tag.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [PublicationTagRepository, PublicationTagService],
  controllers: [PublicationTagController],
  exports: [PublicationTagService],
})
export class PublicationTagModule {}
