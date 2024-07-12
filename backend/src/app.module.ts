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
import { ScriptController } from './endpoints/script/script.controller';
import { ScriptService } from './endpoints/script/script.service';
import { AssetController } from './endpoints/asset/asset.controller';
import { AssetService } from './endpoints/asset/asset.service';
import { GatewayController } from './endpoints/gateway/gateway.controller';
import { GatewayService } from './endpoints/gateway/gateway.service';
import { CompanyController } from './endpoints/company/company.controller';
import { CompanyService } from './endpoints/company/company.service';
import { UserController } from './endpoints/user/user.controller';
import { UserService } from './endpoints/user/user.service';

dotenv.config();
const mongoURI = process.env.MONGO_URL;

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI,{
      readPreference: 'secondaryPreferred' // This allows reads from secondaries if available
    }),
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
    ScriptController,
    AssetController,
    GatewayController,
    CompanyController,
    UserController
  ],
  providers: [
    AppService,
    ScriptService,
    AssetService,
    GatewayService,
    CompanyService,
    UserService
  ],
})
export class AppModule {}
