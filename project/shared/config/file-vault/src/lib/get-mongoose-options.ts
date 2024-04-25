import { getMongoConnectionString } from '@project/shared/helpers';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          port: config.get<string>('application.db.port'),
          authDatabase: config.get<string>('application.db.authBase'),
          databaseName: config.get<string>('application.db.name'),
        }),
      };
    },
    inject: [ConfigService],
  };
}
