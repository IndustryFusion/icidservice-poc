import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Urn' })
  urn_id: number;

  @Prop()
  machine_serial_number: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);