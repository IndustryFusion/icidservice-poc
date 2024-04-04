import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ObjectSubTypeDocument = HydratedDocument<ObjectSubType>;

@Schema()
export class ObjectSubType {
  
  @Prop()
  object_sub_type_code: string;

  @Prop()
  object_sub_type_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ObjectType' })
  object_type_id: number;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const ObjectSubTypeSchema = SchemaFactory.createForClass(ObjectSubType);