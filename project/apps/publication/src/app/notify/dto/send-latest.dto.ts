import { Article, Subscriber } from '@project/shared/app/types';

export class SendLatestDto {
  public subscriber: Subscriber;
  public publications: Article[];
}
