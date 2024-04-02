import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  
  @Prop()
  registration_code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Urn' })
  urn_id: number;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);