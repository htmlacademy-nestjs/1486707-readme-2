import { PipeTransform, BadRequestException } from '@nestjs/common';
import {
  CreateArticleDto,
  createArticleDtoSchema,
} from './dto/create-article.dto';
import {
  UpdateArticleDto,
  updateArticleDtoSchema,
} from './dto/update-article.dto';

export class CreateArticleValidatorPipe
  implements PipeTransform<CreateArticleDto, CreateArticleDto>
{
  public transform(query: CreateArticleDto): CreateArticleDto {
    const result = createArticleDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const createArticleValue = result.value;
    return createArticleValue;
  }
}

export class UpdateArticleValidatorPipe
  implements PipeTransform<UpdateArticleDto, UpdateArticleDto>
{
  public transform(query: UpdateArticleDto): UpdateArticleDto {
    const result = updateArticleDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const updateArticleValue = result.value;
    return updateArticleValue;
  }
}
