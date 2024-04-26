import { Module } from '@nestjs/common';

import {
  ConfigFileVaultModule,
  getMongooseOptions,
} from '@project/shared/config/file-vault';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [
    ConfigFileVaultModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
