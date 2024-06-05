import { Reflector } from '@nestjs/core';
import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
  Injectable,
} from '@nestjs/common';
import Joi = require('joi');

export const ValidateViaJoi = Reflector.createDecorator<Joi.ObjectSchema>();

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly reflector: Reflector) {}

  public transform(query: unknown, metadata: ArgumentMetadata) {
    const schema = this.reflector.get(ValidateViaJoi, metadata.metatype);
    const result = schema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    return result.value;
  }
}
