import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { AuthorRdo } from './rdo/author.rdo';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@ApiTags('authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiResponse({
    type: AuthorRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authorService.getAuthor(id);
    return fillDto(AuthorRdo, existUser.toPOJO());
  }
}
