import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/schemas/company.schema';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';

@Injectable()
export class CheckService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
  ) {}
  private readonly ifricId = process.env.IFRIC_NAMESPACE;

  async verifyServerId(id: string) {
    try {
      if(uuidValidate(id)) {
        const uuid = uuidv5(id, this.ifricId);
        const response = await this.companyModel.findOne({ifric_id_Factory_server: { $in: [uuid] }});
        if(response) {
          return {
            status: 200,
            validation: "passed"
          }
        } else {
          throw new NotFoundException(`No document found with ifric_id_Factory_server containing ${id}`);
        }
      } else {
        throw new BadRequestException(`${id} is Invalid UUID`);
      }
    }catch(err) {
      return err;
    }
  }

  async verifyGatewayId(id: string) {
    try {
      if(uuidValidate(id)) {
        const uuid = uuidv5(id, this.ifricId);
        const response = await this.companyModel.findOne({ifric_id_gateway: { $in: [uuid] }});
        if(response) {
          return {
            status: 200,
            validation: "passed"
          }
        } else {
          throw new NotFoundException(`No document found with ifric_id_gateway containing ${id}`);
        }
      } else {
        throw new BadRequestException(`${id} is Invalid UUID`);
      }
    }catch(err) {
      return err;
    }
  }

  async verifyCompanyId(id: string) {
    try {
      if(uuidValidate(id)) {
        const uuid = uuidv5(id, this.ifricId);
        const response = await this.companyModel.findOne({ifric_id_company: { $in: [uuid] }});
        if(response) {
          return {
            status: 200,
            validation: "passed"
          }
        } else {
          throw new NotFoundException(`No document found with ifric_id_company containing ${id}`);
        }
      } else {
        throw new BadRequestException(`${id} is Invalid UUID`);
      }
    }catch(err) {
      return err;
    }
  }
}
