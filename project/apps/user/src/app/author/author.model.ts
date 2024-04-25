import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@project/shared/app/types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class AuthorModel extends Document implements User {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Author,
  })
  public role: UserRole;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public subscriptions?: string[];
}

export const AuthorSchema = SchemaFactory.createForClass(AuthorModel);
