import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthorModule } from '../author/author.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '@project/shared/config/user';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    AuthorModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy],
})
export class AuthenticationModule {}
