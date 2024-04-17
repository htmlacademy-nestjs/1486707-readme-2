import { Injectable } from '@nestjs/common';
import { FileVaultEntity } from './app.entity';
import { BaseMemoryRepository } from '@project/shared/core';

@Injectable()
export class FileVaultRepository extends BaseMemoryRepository<FileVaultEntity> {}
