import { Injectable, NotFoundException } from '@nestjs/common';
import { FileVaultRepository } from './app.repository';
import { FILE_NOT_FOUND } from './app.constants';
import { CreateFileItemDto } from './dto/create-file-item.dto';
import { FileVaultEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(private readonly fileVaultRepository: FileVaultRepository) {}

  public async getFile(id: string) {
    const foundFile = await this.fileVaultRepository.findById(id);

    if (!foundFile) {
      throw new NotFoundException(FILE_NOT_FOUND);
    }

    return foundFile;
  }

  public async saveFile(dto: CreateFileItemDto) {
    const newFile = new FileVaultEntity(dto);
    return this.fileVaultRepository.save(newFile);
  }

  public async deleteFile(id: string) {
    return this.fileVaultRepository.deleteById(id);
  }
}
