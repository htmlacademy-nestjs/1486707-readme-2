import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileVaultRepository } from './app.repository';

@Module({
  controllers: [AppController],
  providers: [AppService, FileVaultRepository],
  exports: [FileVaultRepository],
})
export class AppModule {}
