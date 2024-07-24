import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Model } from 'mongoose';
import { JwtToken } from '@project/shared/app/types';

export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    refreshTokenModel: Model<RefreshTokenModel>
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }

  public async deleteById(id: string) {
    await this.model.deleteOne({ tokenId: id }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<JwtToken | null> {
    return await this.model.findOne({ tokenId }).exec();
  }

  public async deleteByExpiredTokens() {
    return await this.model
      .deleteMany({ expiresIn: { $lt: new Date() } })
      .exec();
  }
}
