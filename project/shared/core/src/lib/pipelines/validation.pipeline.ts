import { PipeTransform, BadRequestException } from '@nestjs/common';
import Joi = require('joi');

export abstract class ValidatorPipe<T, V> implements PipeTransform<T, V> {
  public schema: Joi.ObjectSchema<unknown>;

  constructor(schema) {
    this.schema = schema;
  }

  public transform(query: T): V {
    const result = this.schema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    return result.value;
  }
}
