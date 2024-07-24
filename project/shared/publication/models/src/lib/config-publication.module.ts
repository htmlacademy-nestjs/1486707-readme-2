import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './app.config';
import rabbitConfig from './rabbit.config';

const ENV_PUBLICATION_FILE_PATH = 'apps/publication/publication.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, rabbitConfig],
      envFilePath: ENV_PUBLICATION_FILE_PATH,
    }),
  ],
})
export class ConfigPublicationModule {}
