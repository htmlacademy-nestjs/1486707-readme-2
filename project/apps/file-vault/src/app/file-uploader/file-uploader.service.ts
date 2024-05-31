import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FileUploaderRepository } from './file-uploader.repository';
import {
  CANNOT_SAVE_FILE_ERROR,
  FILE_NOT_FOUND,
} from './file-uploader.constants';

import { FileVaultConfig } from '@project/shared/config/file-vault';
import { ConfigType } from '@nestjs/config';
import { join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';
import { extension } from 'mime-types';
import { StoredFile } from '@project/shared/app/types';
import { FileVaultEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
    private readonly fileUploaderRepository: FileUploaderRepository
  ) {}

  private getUploadDirectoryPath(): string {
    return join(this.config.uploadDirectory);
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename
    );
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype) || '';
      const fileName = `${randomUUID()}.${fileExtension}`;

      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        filename: fileName,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(CANNOT_SAVE_FILE_ERROR);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileVaultEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = FileVaultEntity.fromObject({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
    });

    return this.fileUploaderRepository.save(fileEntity);
  }

  public async getFile(id: string) {
    const foundFile = await this.fileUploaderRepository.findById(id);

    if (!foundFile) {
      throw new NotFoundException(FILE_NOT_FOUND);
    }

    return foundFile;
  }

  public async deleteFile(id: string) {
    return this.fileUploaderRepository.deleteById(id);
  }
}
