import { Module } from '@nestjs/common';

import { AuthorModule } from './author/author.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthorModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
