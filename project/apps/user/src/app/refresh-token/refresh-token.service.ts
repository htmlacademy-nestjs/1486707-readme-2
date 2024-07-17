import { jwtConfig } from '@project/shared/config/user';
import { RefreshTokenRepository } from './refresh-token.repository';
import { parseTime } from '@project/shared/helpers';
import { RefreshTokenEntity } from './refresh-token.entity';
import dayjs from 'dayjs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@project/shared/app/types';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async doesExist(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteById(tokenId);
  }

  public async deleteExpiredRefreshTokens() {
    return await this.refreshTokenRepository.deleteByExpiredTokens();
  }
}
