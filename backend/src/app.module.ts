import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema, Company } from './schemas/company.schema';
import { RegistrationController } from './endpoints/registration/registration.controller';
import { RegistrationService } from './endpoints/registration/registration.service';
import { CheckController } from './endpoints/check/check.controller';
import { CheckService } from './endpoints/check/check.service';
dotenv.config();
const mongoURI = process.env.MONGO_URL;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [
    AppController,
    RegistrationController,
    CheckController
  ],
  providers: [
    AppService,
    RegistrationService,
    CheckService
  ],
})
export class AppModule {}
