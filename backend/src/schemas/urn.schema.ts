import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UrnDocument = HydratedDocument<Urn>;

@Schema()
export class Urn {
  
  @Prop()
  urn: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const UrnSchema = SchemaFactory.createForClass(Urn);