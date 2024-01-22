import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegistrationDescriptionDto } from './dto/registrationDescription.dto';
import { User } from 'src/schemas/user.schema';
import { v5 as uuidv5 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(data: RegistrationDescriptionDto) {
    const saltRounds = 10; 
    data.password = await bcrypt.hash(data.password, saltRounds);
    data.confirm_password = await bcrypt.hash(data.confirm_password, saltRounds);
    data.icid_manufacturer = uuidv5(data.manufacturer_name, process.env.IFF_NAMESPACE);
    console.log('user data ',data);
    const createdUser = new this.userModel(data);
    return createdUser.save();
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
