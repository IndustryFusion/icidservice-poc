import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ObjectTypeDocument = HydratedDocument<ObjectType>;

@Schema()
export class ObjectType {
  
  @Prop()
  object_type_code: string;

  @Prop()
  object_type_name: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const ObjectTypeSchema = SchemaFactory.createForClass(ObjectType);