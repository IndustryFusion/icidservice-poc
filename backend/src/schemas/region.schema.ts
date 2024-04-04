import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type RegionDocument = HydratedDocument<Region>;

@Schema()
export class Region {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DataSpace' })
  dataSpace_id: number;

  @Prop()
  region_code: string;

  @Prop()
  region_name: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const RegionSchema = SchemaFactory.createForClass(Region);