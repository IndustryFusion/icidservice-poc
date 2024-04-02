import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;

@Schema()
export class Country {
  
  @Prop()
  country_code: string;

  @Prop()
  country_name: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);