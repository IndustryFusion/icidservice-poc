import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type ServerDocument = HydratedDocument<Server>;

@Schema()
export class Server {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Urn' })
  urn_id: number;

  @Prop()
  hardware_uuid: UUID;

  @Prop()
  hardware_serial_number: string;

  @Prop()
  created_at: Date;

  @Prop()
  last_updated_at: Date;
}

export const ServerSchema = SchemaFactory.createForClass(Server);