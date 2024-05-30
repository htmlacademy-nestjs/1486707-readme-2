import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { CommentService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentValidatorPipe } from './comment.validation.pipeline';

@ApiTags('comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comments found',
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const publicationComments =
      await this.commentService.getCommentsByArticleId(id);
    return publicationComments.map((comment) =>
      fillDto(CommentRdo, comment.toPOJO())
    );
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new comment has been successfully created',
  })
  @Post('create')
  public async create(
    @Body(new CreateCommentValidatorPipe()) dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.createComment(dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publication comments are deleted',
  })
  @Delete('/delete/:id')
  public async delete(@Param('id') id: string) {
    this.commentService.deleteCommentById(id);
  }
}
