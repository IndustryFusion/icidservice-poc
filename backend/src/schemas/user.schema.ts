import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop()
  employee_code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Urn' })
  urn_id: number;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);