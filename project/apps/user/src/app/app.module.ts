import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorModule } from './author/author.module';
import { AuthenticationModule } from './authentication/authentication.module';
import {
  ConfigUserModule,
  getMongooseOptions,
} from '@project/shared/config/user';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthorModule,
    AuthenticationModule,
    ConfigUserModule,
    NotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
