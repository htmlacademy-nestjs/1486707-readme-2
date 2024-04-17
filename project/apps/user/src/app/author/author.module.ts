import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { AuthorRdo } from './rdo/author.rdo';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository, AuthorRdo],
  exports: [AuthorRepository, AuthorRdo],
})
export class AuthorModule {}
