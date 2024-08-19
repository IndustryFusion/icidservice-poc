// 
// Copyright (c) 2024 IB Systems GmbH 
// 
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
// 
// http://www.apache.org/licenses/LICENSE-2.0 
// 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 
// 

import { Injectable } from '@nestjs/common';
import { countries } from "countries-list";
import { Company } from 'src/schemas/company.schema';
import { Country } from 'src/schemas/country.schema';
import { Asset } from 'src/schemas/asset.schema';
import { DataSpace } from 'src/schemas/dataSpace.schema';
import { GateWay } from 'src/schemas/gateway.schema';
import { ObjectType } from 'src/schemas/objectType.schema';
import { ObjectSubType } from 'src/schemas/objectSubType.schema';
import { Region } from 'src/schemas/region.schema';
import { Server } from 'src/schemas/server.schema';
import { Urn } from 'src/schemas/urn.schema';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class ScriptService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    @InjectModel(Country.name)
    private countryModel: Model<Country>,
    @InjectModel(Asset.name)
    private assetModel: Model<Asset>,
    @InjectModel(DataSpace.name)
    private dataSpaceModel: Model<DataSpace>,
    @InjectModel(GateWay.name)
    private gateWayModel: Model<GateWay>,
    @InjectModel(ObjectType.name)
    private objectTypeModel: Model<ObjectType>,
    @InjectModel(ObjectSubType.name)
    private objectSubTypeModel: Model<ObjectSubType>,
    @InjectModel(Region.name)
    private regionModel: Model<Region>,
    @InjectModel(Server.name)
    private serverModel: Model<Server>,
    @InjectModel(Urn.name)
    private urnModel: Model<Urn>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create() {
    try{

      const dataSpaceData = new this.dataSpaceModel({
        dataSpace_code: "IFX" ,  
        dataSpace_name: "IndustryFusion-X",
        created_at: moment().format(),
        last_updated_at: moment().format()
      });
      await dataSpaceData.save();
      
      let response = await this.dataSpaceModel.find({dataSpace_code: "IFX"});
      console.log('response for data space ',response);
      if(response.length > 0){
        let regionData = [{
          region_code: "EUR",  
          region_name: "Europe",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          region_code: "NAR",  
          region_name: "North America",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          region_code: "SAR",  
          region_name: "South America",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          region_code: "ASA",  
          region_name: "Asia",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          region_code: "AFR",  
          region_name: "Africa",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          region_code: "AUS",  
          region_name: "Australia",
          dataSpace_id: response[0].id,
          created_at: moment().format(),
          last_updated_at: moment().format()
        }];
        await this.regionModel.insertMany(regionData);
      }
      
      const countryData = Object.keys(countries).map(key => ({
        country_code: key,
        country_name: countries[key].name,
        created_at: moment().format(),
        last_updated_at: moment().format()
      }));
      await this.countryModel.insertMany(countryData);

      const objectTypeData = [{
          object_type_code: "HWR",   
          object_type_name: "Hardware",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_type_code: "NLD" ,
          object_type_name: "NGSI-LD",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_type_code: "COM",
          object_type_name: "Company",
          created_at: moment().format(),
          last_updated_at: moment().format()
        }]
      await this.objectTypeModel.insertMany(objectTypeData);

      let objectSubTypeData = [
        {
          object_sub_type_code: "AST",
          object_sub_type_name: "Asset",
          object_type_id: "NLD",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_sub_type_code: "USR",
          object_sub_type_name: "User",
          object_type_id: "NLD",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_sub_type_code: "GTW",
          object_sub_type_name: "Gateway",
          object_type_id: "HWR",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_sub_type_code: "FSV",
          object_sub_type_name: "Factory Server",
          object_type_id: "HWR",
          created_at: moment().format(),
          last_updated_at: moment().format()
        },{
          object_sub_type_code: "NAP",
          object_sub_type_name: "Not Applicable",
          object_type_id: "COM",
          created_at: moment().format(),
          last_updated_at: moment().format()
        }
      ]

      for(let i = 0; i < objectSubTypeData.length; i++){
        const response = await this.objectTypeModel.find({object_type_code: objectSubTypeData[i].object_type_id});
        if(response.length > 0){
          objectSubTypeData[i].object_type_id = response[0].id;
          const objectSubTypeValues = new this.objectSubTypeModel(objectSubTypeData[i]);
          await objectSubTypeValues.save();
        }
      }
      console.log('objectSubTypeData ',objectSubTypeData);
      return {
        success: true,
        status: 201,
        message: "Data added successfully"
      }
    }catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all script`;
  }

  findOne(id: number) {
    return `This action returns a #${id} script`;
  }

  update(id: number) {
    return `This action updates a #${id} script`;
  }

  remove(id: number) {
    return `This action removes a #${id} script`;
  }
}
