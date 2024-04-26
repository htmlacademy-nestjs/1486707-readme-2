import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';

import { FileUploaderService } from './file-uploader.service';
import { ApiResponse } from '@nestjs/swagger';
import { FileItemRdo } from './rdo/file-item.rdo';

@Controller()
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @ApiResponse({
    type: FileItemRdo,
    status: HttpStatus.OK,
    description: 'File found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const file = await this.fileUploaderService.getFile(id);
    return fillDto(FileItemRdo, file.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    await this.fileUploaderService.deleteFile(id);
  }
}
