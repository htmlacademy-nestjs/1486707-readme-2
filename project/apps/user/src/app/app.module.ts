import { Module } from '@nestjs/common';

import { AuthorModule } from './author/author.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUserModule } from '@project/shared/config/user'

@Module({
  imports: [AuthorModule, AuthenticationModule, ConfigUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
