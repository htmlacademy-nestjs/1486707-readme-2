import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app/types';
import { rabbitConfig } from '@project/shared/config/user';
import { SendLatestDto } from './dto/send-latest.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendLatestPublications(dto: SendLatestDto) {
    return this.rabbitClient.publish<SendLatestDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPublication,
      { ...dto }
    );
  }
}
