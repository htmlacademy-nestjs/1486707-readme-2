import {
  CreateCommentDto,
  createCommentDtoSchema,
} from './dto/create-comment.dto';
import { ValidatorPipe } from '@project/shared/core';

export class CreateCommentValidatorPipe extends ValidatorPipe<
  CreateCommentDto,
  CreateCommentDto
> {
  constructor() {
    super(createCommentDtoSchema);
  }
}
