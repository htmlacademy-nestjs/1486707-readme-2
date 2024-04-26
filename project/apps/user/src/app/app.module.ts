import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorModule } from './author/author.module';
import { AuthenticationModule } from './authentication/authentication.module';
import {
  ConfigUserModule,
  getMongooseOptions,
} from '@project/shared/config/user';

@Module({
  imports: [
    AuthorModule,
    AuthenticationModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
