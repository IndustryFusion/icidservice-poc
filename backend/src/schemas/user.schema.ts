import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  confirm_password: string;

  @Prop()
  manufacturer_name: string;

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
  icid_manufacturer: string;
}

export const UserSchema = SchemaFactory.createForClass(User);