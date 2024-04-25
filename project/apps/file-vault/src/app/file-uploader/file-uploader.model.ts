import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {FileVaultItem} from '@project/shared/app/types';

@Schema({
    collection: 'files',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  
  })
  export class FileUploaderModel extends Document implements FileVaultItem {
    @Prop({
      required: true,
    })
    public originalName: string;
  
    @Prop({
      required: true
    })
    public hashName: string;
  
    @Prop({
      required: true
    })
    public subDirectory: string;
  
    @Prop({
      required: true,
    })
    public mimetype: string;
  
    @Prop({
      required: true,
    })
    public path: string;
  
    @Prop({
      required: true,
    })
    public size: number;
  
    public id?: string;
  }
  
  export const FileSchema = SchemaFactory.createForClass(FileUploaderModel);
  
  FileSchema.virtual('id').get(function() {
    return this._id.toString();
  });