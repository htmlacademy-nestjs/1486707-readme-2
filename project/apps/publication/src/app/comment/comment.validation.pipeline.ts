import { PipeTransform, BadRequestException } from '@nestjs/common';
import {
  CreateCommentDto,
  createCommentDtoSchema,
} from './dto/create-comment.dto';

export class CreateCommentValidatorPipe
  implements PipeTransform<CreateCommentDto, CreateCommentDto>
{
  public transform(query: CreateCommentDto): CreateCommentDto {
    const result = createCommentDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const createCommentValue = result.value;
    return createCommentValue;
  }
}
