import { PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateTagDto, createTagDtoSchema } from './dto/create-tag.dto';
import { UpdateTagDto, updateTagDtoSchema } from './dto/update-tag.dto';

export class CreateTagValidatorPipe
  implements PipeTransform<CreateTagDto, CreateTagDto>
{
  public transform(query: CreateTagDto): CreateTagDto {
    const result = createTagDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const createTagValue = result.value;
    return createTagValue;
  }
}

export class UpdateTagValidatorPipe
  implements PipeTransform<UpdateTagDto, UpdateTagDto>
{
  public transform(query: UpdateTagDto): UpdateTagDto {
    const result = updateTagDtoSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const updateTagValue = result.value;
    return updateTagValue;
  }
}
