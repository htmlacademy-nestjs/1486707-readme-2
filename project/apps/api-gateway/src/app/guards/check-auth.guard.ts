import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '@project/shared/config/api-gateway';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
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
  }
}
