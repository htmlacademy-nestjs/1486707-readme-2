import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { AuthorRdo } from './rdo/author.rdo';
import { AuthorModel, AuthorSchema } from './author.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/shared/config/user';
import { JwtAccessStrategy } from '../authentication/strategies/jwt-access.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthorModel.name, schema: AuthorSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository, AuthorRdo, JwtAccessStrategy],
  exports: [AuthorRepository, AuthorRdo],
})
export class AuthorModule {}
