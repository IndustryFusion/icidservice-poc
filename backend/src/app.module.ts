import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import { RegistrationController } from './endpoints/registration/registration.controller';
import { RegistrationService } from './endpoints/registration/registration.service';

dotenv.config();
const mongoURI = process.env.MONGO_URL;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    RegistrationController
  ],
  providers: [
    AppService,
    RegistrationService
  ],
})
export class AppModule {}
