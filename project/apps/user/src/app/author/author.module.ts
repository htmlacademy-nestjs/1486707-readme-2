import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { AuthorRdo } from './rdo/author.rdo';
import { AuthorModel, AuthorSchema } from './author.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthorModel.name, schema: AuthorSchema },
    ]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository, AuthorRdo],
  exports: [AuthorRepository, AuthorRdo],
})
export class AuthorModule {}
