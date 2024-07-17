import { Controller, Get } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/shared/app/types';
import { EmailSubscriberService } from './email-subcriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller('notifications')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notifications',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notifications.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @Get('/:id')
  public async getSubscriber(id: string) {
    return await this.subscriberService.getSubscriber(id);
  }
}
