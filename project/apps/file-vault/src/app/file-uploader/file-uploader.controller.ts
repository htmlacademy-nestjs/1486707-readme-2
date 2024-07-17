import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';

import { FileUploaderService } from './file-uploader.service';
import { ApiResponse } from '@nestjs/swagger';
import { FileItemRdo } from './rdo/file-item.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { ACCEPTED_FILE_TYPES } from './file-uploader.constants';

@Controller('files')
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is saved',
  })
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter(_req, file, callback) {
        ACCEPTED_FILE_TYPES.includes(file.mimetype)
          ? callback(null, true)
          : callback(null, false);
      },
    })
  )
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(FileItemRdo, fileEntity.toPOJO());
  }
}
