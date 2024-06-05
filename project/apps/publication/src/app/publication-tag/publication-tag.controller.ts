import { fillDto } from '@project/shared/helpers';
import { CreateTagDto } from './dto/create-tag.dto';
import { PublicationTagService } from './publication-tag.service';
import { TagRdo } from './rdo/tag.rdo';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JoiValidationPipe } from '@project/shared/core';

@Controller('tags')
export class PublicationTagController {
  constructor(private readonly publicationTagService: PublicationTagService) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    return this.publicationTagService.getTag(id);
  }

  @Post('/')
  public async create(@Body(JoiValidationPipe) dto: CreateTagDto) {
    const newTag = await this.publicationTagService.createTag(dto);
    return fillDto(TagRdo, newTag.toPOJO());
  }

  @Delete('/:id')
  public async destroy(@Param('id') id: string) {
    await this.publicationTagService.deleteTag(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body(JoiValidationPipe) dto: UpdateTagDto
  ) {
    const updatedTag = await this.publicationTagService.updateTag(id, dto);
    return fillDto(TagRdo, updatedTag.toPOJO());
  }
}
