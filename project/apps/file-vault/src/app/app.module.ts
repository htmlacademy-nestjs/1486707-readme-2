import { Module } from '@nestjs/common';

import { FileUploaderController } from './file-uploader/file-uploader.controller';
import { FileUploaderService } from './file-uploader/file-uploader.service';
import { FileUploaderRepository } from './file-uploader/file-uploader.repository';
import { ConfigFileVaultModule, getMongooseOptions } from '@project/shared/config/file-vault';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigFileVaultModule, MongooseModule.forRootAsync(getMongooseOptions())],
  controllers: [FileUploaderController],
  providers: [FileUploaderService, FileUploaderRepository],
  exports: [FileUploaderRepository],
})
export class AppModule {}
