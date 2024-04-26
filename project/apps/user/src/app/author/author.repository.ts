import { BaseMongoRepository } from '@project/shared/core';
import { AuthorEntity } from './author.entity';
import { Injectable } from '@nestjs/common';
import { AuthorModel } from './author.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthorRepository extends BaseMongoRepository<
  AuthorEntity,
  AuthorModel
> {
  constructor(@InjectModel(AuthorModel.name) authorModel: Model<AuthorModel>) {
    super(authorModel, AuthorEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<AuthorEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntitiyFromDocument(document);
  }
}
