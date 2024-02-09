import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationDescriptionDto } from './dto/registrationDescription.dto';
import { User } from 'src/schemas/user.schema';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  private readonly ifricId = process.env.IFRIC_NAMESPACE;

  async create(data: RegistrationDescriptionDto) {
    const response = await this.userModel.find({companyRegistrationNumber: data.companyRegistrationNumber});
    console.log('response ',response)
    if(response.length > 0) {
      return 'Company Registration Number already exists';
    } else {  
      data.ifric_id_company = uuidv5(data.companyRegistrationNumber, this.ifricId);
      data.ifric_id_Factory_server = [];
      for(let i = 0; i < data.factoryServerUUID.length; i++) {
        let id = data.factoryServerUUID[i];
        if(uuidValidate(id)) {
          data.ifric_id_Factory_server.push(uuidv5(id, this.ifricId));
        } else {
          throw new BadRequestException(`${data.factoryServerUUID[i]} is Invalid UUID`);
        }
      }
      data.ifric_id_gateway = [];
      for(let i = 0; i < data.gatewayUUID.length; i++) {
        let id = data.gatewayUUID[i];
        if(uuidValidate(id)) {
          data.ifric_id_gateway.push(uuidv5(id, this.ifricId));
        } else {
          throw new BadRequestException(`${data.gatewayUUID[i]} is Invalid UUID`);
        }
      }
      const createdUser = new this.userModel(data);
      return createdUser.save();
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  update(id: string) {
    return `This action updates a #${id} registration`;
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
