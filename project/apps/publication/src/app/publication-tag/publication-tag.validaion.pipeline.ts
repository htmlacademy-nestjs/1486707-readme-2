import { CreateTagDto, createTagDtoSchema } from './dto/create-tag.dto';
import { UpdateTagDto, updateTagDtoSchema } from './dto/update-tag.dto';
import { ValidatorPipe } from '@project/shared/core';

export class CreateTagValidatorPipe extends ValidatorPipe<
  CreateTagDto,
  CreateTagDto
> {
  constructor() {
    super(createTagDtoSchema);
  }
}

export class UpdateTagValidatorPipe extends ValidatorPipe<
  UpdateTagDto,
  UpdateTagDto
> {
  constructor() {
    super(updateTagDtoSchema);
  }
}
