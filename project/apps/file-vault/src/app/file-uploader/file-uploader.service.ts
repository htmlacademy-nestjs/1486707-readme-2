import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploaderRepository } from './file-uploader.repository';
import { FILE_NOT_FOUND } from './file-uploader.constants';

@Injectable()
export class FileUploaderService {
  constructor(private readonly fileUploaderRepository: FileUploaderRepository) {}

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
