import { Injectable } from '@nestjs/common';
import { FileVaultEntity } from './file-uploader.entity';
import { BaseMongoRepository } from '@project/shared/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUploaderModel } from './file-uploader.model';

@Injectable()
export class FileUploaderRepository extends BaseMongoRepository<
  FileVaultEntity,
  FileUploaderModel
> {
  constructor(
    @InjectModel(FileUploaderModel.name) fileModel: Model<FileUploaderModel>
  ) {
    super(fileModel, FileVaultEntity.fromObject);
  }
}
