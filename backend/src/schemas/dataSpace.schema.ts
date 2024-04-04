import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type DataSpaceDocument = HydratedDocument<DataSpace>;

@Schema()
export class DataSpace {
  
  @Prop()
  dataSpace_code: string;

  @Prop()
  dataSpace_name: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const DataSpaceSchema = SchemaFactory.createForClass(DataSpace);