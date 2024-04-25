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

import { AppService } from './file-uploader.service';
import { ApiResponse } from '@nestjs/swagger';
import { FileItemRdo } from './rdo/file-item.rdo';
import { CreateFileItemDto } from '../dto/create-file-item.dto';

@Controller()
export class FileUploaderController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    type: FileItemRdo,
    status: HttpStatus.OK,
    description: 'File found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const file = await this.appService.getFile(id);
    return fillDto(FileItemRdo, file.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new file item has been successfully created',
  })
  @Post('create')
  public async create(@Body() dto: CreateFileItemDto) {
    const newFile = await this.appService.saveFile(dto);
    return fillDto(FileItemRdo, newFile.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File is deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    this.appService.deleteFile(id);
  }
}
