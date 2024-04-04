import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema, Company } from './schemas/company.schema';
import { CountrySchema, Country } from 'src/schemas/country.schema';
import { AssetSchema, Asset } from 'src/schemas/asset.schema';
import { DataSpaceSchema, DataSpace } from 'src/schemas/dataSpace.schema';
import { GateWaySchema, GateWay } from 'src/schemas/gateway.schema';
import { ObjectTypeSchema, ObjectType } from 'src/schemas/objectType.schema';
import { ObjectSubTypeSchema, ObjectSubType } from 'src/schemas/objectSubType.schema';
import { RegionSchema, Region } from 'src/schemas/region.schema';
import { ServerSchema, Server } from 'src/schemas/server.schema';
import { UrnSchema, Urn } from 'src/schemas/urn.schema';
import { UserSchema, User } from 'src/schemas/user.schema';
import { RegistrationController } from './endpoints/registration/registration.controller';
import { RegistrationService } from './endpoints/registration/registration.service';
import { CheckController } from './endpoints/check/check.controller';
import { CheckService } from './endpoints/check/check.service';
import { ScriptController } from './endpoints/script/script.controller';
import { ScriptService } from './endpoints/script/script.service';
dotenv.config();
const mongoURI = process.env.MONGO_URL;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Country.name, schema: CountrySchema },
      { name: Asset.name, schema: AssetSchema },
      { name: DataSpace.name, schema: DataSpaceSchema },
      { name: ObjectType.name, schema: ObjectTypeSchema },
      { name: ObjectSubType.name, schema: ObjectSubTypeSchema },
      { name: GateWay.name, schema: GateWaySchema },
      { name: Region.name, schema: RegionSchema },
      { name: Server.name, schema: ServerSchema },
      { name: Urn.name, schema: UrnSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    RegistrationController,
    CheckController,
    ScriptController
  ],
  providers: [
    AppService,
    RegistrationService,
    CheckService,
    ScriptService
  ],
})
export class AppModule {}
