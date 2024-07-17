import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository.save(
      new EmailSubscriberEntity().populate(subscriber)
    );
  }

  public async updateSubscriberLastUpdate(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const newDate = new Date();

    return await this.emailSubscriberRepository.setNewUpdateDate(email, newDate);
  }

  public async getSubscriber(id: string) {
    return await this.emailSubscriberRepository.findById(id);
  }
}
