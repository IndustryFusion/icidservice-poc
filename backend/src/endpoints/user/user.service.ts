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
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Urn } from 'src/schemas/urn.schema';
import { User } from 'src/schemas/user.schema';
import { ObjectType } from 'src/schemas/objectType.schema';
import { ObjectSubType } from 'src/schemas/objectSubType.schema';
import { Company } from 'src/schemas/company.schema';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Urn.name)
    private urnModel: Model<Urn>,
    @InjectModel(ObjectSubType.name)
    private objectSubTypeModel: Model<ObjectSubType>,
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    @InjectModel(ObjectType.name)
    private ObjectTypeModel: Model<ObjectType>
  ) {}
  private readonly ifricId = process.env.IFRIC_NAMESPACE;

  async create(data: any) {
    try{
      let objectSubTypeResponse = await this.objectSubTypeModel.find({object_sub_type_code: data.object_sub_type_code});
        if(objectSubTypeResponse.length > 0){
          let objectTypeData = await this.ObjectTypeModel.findById(objectSubTypeResponse[0].object_type_id);
          if(objectTypeData && objectTypeData.object_type_code == data.object_type_code){
            let response = await this.userModel.find({employee_code: data.employee_code});
            if(!(response.length > 0)){
              let uuid = uuidv5(data.employee_code, this.ifricId);
              let ifricId = `urn:ifric:${data.dataspace_code.toLowerCase()}-${data.region_code.toLowerCase()}-${data.object_type_code.toLowerCase()}-${data.object_sub_type_code.toLowerCase()}-${uuid}`;
              const urnData = new this.urnModel({
                urn: ifricId,
                created_at: moment().format(),
                last_updated_at: moment().format()
              })
              await urnData.save();
              let urnResponse = await this.urnModel.find({urn: ifricId});
              let companyResponse = await this.companyModel.findById(data.company_id);
              if(urnResponse.length > 0 && companyResponse){
                const userData = new this.userModel({
                  employee_code: data.employee_code,
                  company_id: data.company_id,
                  urn_id: urnResponse[0].id,
                  created_at: moment().format(),
                  last_updated_at: moment().format()
                })
                await userData.save();
                return { status: 201, message: 'User created successfully' };
              } else{
                return { status: 404, message: 'Urn ID does not exist' };
              }
            }else{
              return { status: 400, message: 'User already exists' };
            }
          }else{
            return { status: 400, message: 'Invalid Object Sub Type Code' };
          }
        }else{
          return { status: 404, message: 'Object Sub Type Code does not exist' };
        }
    }catch(err){
      return err;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
