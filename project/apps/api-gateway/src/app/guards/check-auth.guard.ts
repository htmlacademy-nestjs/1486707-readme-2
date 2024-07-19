import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';

const FAILED_TOKEN_EXCEPTION_MESSAGE = 'Failed at verifying the token';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/check`,
        {},
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );

      request['user'] = data;
      return true;
    } catch (err) {
      throw new UnauthorizedException(FAILED_TOKEN_EXCEPTION_MESSAGE);
    }
  }
}
