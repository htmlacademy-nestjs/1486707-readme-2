import { Subscriber } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity
  implements Subscriber, Entity<string, Subscriber>
{
  public id?: string;
  public email: string;
  public name: string;
  public lastUpdate?: Date;

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      lastUpdate: this.lastUpdate,
    };
  }

  public populate(data: Subscriber): EmailSubscriberEntity {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.name = data.name;
    this.lastUpdate = data.lastUpdate || new Date();

    return this;
  }

  static fromObject(data: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity().populate(data);
  }
}
