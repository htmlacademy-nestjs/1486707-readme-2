import {
  CreateArticleDto,
  createArticleDtoSchema,
} from './dto/create-article.dto';
import {
  UpdateArticleDto,
  updateArticleDtoSchema,
} from './dto/update-article.dto';
import { ValidatorPipe } from '@project/shared/core';

export class CreateArticleValidatorPipe extends ValidatorPipe<
  CreateArticleDto,
  CreateArticleDto
> {
  constructor() {
    super(createArticleDtoSchema);
  }
}

export class UpdateArticleValidatorPipe extends ValidatorPipe<
  UpdateArticleDto,
  UpdateArticleDto
> {
  constructor() {
    super(updateArticleDtoSchema);
  }
}
