import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop()
  companyName: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  zip: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  company_registration_number: number;

  @Prop()
  factory_server_uuid: string[];

  @Prop()
  gateway_uuid: string[];

  @Prop()
  ifric_id_company: string;

  @Prop()
  ifric_id_Factory_server: string[];

  @Prop()
  ifric_id_gateway: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);