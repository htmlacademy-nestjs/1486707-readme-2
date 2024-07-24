import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ArticlesController } from './articles.controller';
import { UsersController } from './users.controller';
import {
  HTTP_CLIENT_MAX_REDIRECTS,
  HTTP_CLIENT_TIMEOUT,
} from '@project/shared/config/api-gateway';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [ArticlesController, UsersController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
