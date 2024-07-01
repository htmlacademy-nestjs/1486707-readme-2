import { ValidateViaJoi } from '@project/shared/core';
import Joi from 'joi';

export const createSubscriberDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
}).options({ abortEarly: false });

@ValidateViaJoi(createSubscriberDtoSchema)
export class CreateSubscriberDto {
  public email: string;
  public name: string;
}
