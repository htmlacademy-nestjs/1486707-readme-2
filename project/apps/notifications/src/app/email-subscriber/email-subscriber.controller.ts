import { Controller, Get, Param } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { Article, RabbitRouting, Subscriber } from '@project/shared/app/types';
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

  @RabbitSubscribe({
    exchange: 'readme.notifications',
    routingKey: RabbitRouting.SendNewPublication,
    queue: 'readme.notifications.income',
  })
  public async sendLatestPublications({
    subscriber,
    publications,
  }: {
    subscriber: Subscriber;
    publications: Article[];
  }) {
    await this.subscriberService.updateSubscriberLastUpdate(subscriber);

    await this.mailService.sendNewPublication(subscriber, publications);
  }

  @Get('/:email')
  public async getSubscriber(@Param('email') email: string) {
    return await this.subscriberService.getSubscriber(email);
  }
}
