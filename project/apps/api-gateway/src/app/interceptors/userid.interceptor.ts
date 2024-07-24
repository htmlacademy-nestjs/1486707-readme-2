import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

const FAILED_AT_RETRIEVING_USER_ID =
  'Failed at retreiving user id from the token';

@Injectable()
export class UserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    try {
      const request = context.switchToHttp().getRequest();
      request.body['userId'] = request.user.sub;

      return next.handle();
    } catch (err) {
      throw new NotFoundException(FAILED_AT_RETRIEVING_USER_ID);
    }
  }
}
