import { Injectable } from '@nestjs/common';
import { GateWay } from 'src/schemas/gateway.schema';
import { Server } from 'src/schemas/server.schema';
import { ObjectSubType } from 'src/schemas/objectSubType.schema';
import { ObjectType } from 'src/schemas/objectType.schema';
import { Urn } from 'src/schemas/urn.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import * as moment from 'moment';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(GateWay.name)
    private gateWayModel: Model<GateWay>,
    @InjectModel(Server.name)
    private serverModel: Model<Server>,
    @InjectModel(Urn.name)
    private urnModel: Model<Urn>,
    @InjectModel(ObjectSubType.name)
    private objectSubTypeModel: Model<ObjectSubType>,
    @InjectModel(ObjectType.name)
    private ObjectTypeModel: Model<ObjectType>
  ) {}
  private readonly ifricId = process.env.IFRIC_NAMESPACE;
  async create(data: any) {
    try{
      let objectSubTypeResponse = await this.objectSubTypeModel.find({object_sub_type_code: data.object_sub_type_code.toUpperCase()});
      if(objectSubTypeResponse.length > 0){
        let objectTypeData = await this.ObjectTypeModel.findById(objectSubTypeResponse[0].object_type_id);
        if(objectTypeData && objectTypeData.object_type_code == data.object_type_code){
          if(data.object_sub_type_code.toUpperCase() == 'GTW'){
            let response = await this.gateWayModel.find({hardware_uuid: data.hardware_uuid});
            if(!response.length){
              let uuid = uuidv5(data.hardware_uuid + data.hardware_serial_number, this.ifricId);
              let ifricId = `urn:ifric:${data.dataspace_code}-${data.region_code}-${data.object_type_code}-${data.object_sub_type_code}-${uuid}`;
              const urnData = new this.urnModel({
                urn: ifricId,
                created_at: moment().format(),
                last_updated_at: moment().format()
              })
              await urnData.save();
              let urnResponse = await this.urnModel.find({urn: ifricId});
              if(urnResponse.length > 0){
                const gatewayData = new this.gateWayModel({
                  hardware_serial_number: data.hardware_serial_number,
                  hardware_uuid: data.hardware_uuid,
                  urn_id: urnResponse[0].id,
                  created_at: moment().format(),
                  last_updated_at: moment().format()
                })
                await gatewayData.save();
                return { status: 201, message: 'GateWay created successfully' };
              } else{
                return { status: 404, message: 'Urn ID does not exist' };
              }
            }else{
              return { status: 400, message: 'hardware already exists In Gateway' };
            }
          } else if(data.object_sub_type_code.toUpperCase() == 'FSV'){
            let response = await this.serverModel.find({hardware_uuid: data.hardware_uuid});
            if(!response.length){
              let uuid = uuidv5(data.hardware_uuid + data.hardware_serial_number, this.ifricId);
              let ifricId = `urn:ifric:${data.dataspace_code}-${data.region_code}-${data.object_type_code}-${data.object_sub_type_code}-${uuid}`;
              const urnData = new this.urnModel({
                urn: ifricId,
                created_at: moment().format(),
                last_updated_at: moment().format()
              })
              await urnData.save();
              let urnResponse = await this.urnModel.find({urn: ifricId});
              if(urnResponse.length > 0){
                const serverData = new this.serverModel({
                  hardware_serial_number: data.hardware_serial_number,
                  hardware_uuid: data.hardware_uuid,
                  urn_id: urnResponse[0].id,
                  created_at: moment().format(),
                  last_updated_at: moment().format()
                })
                await serverData.save();
                return { status: 201, message: 'Factory Server created successfully' };
              } else{
                return { status: 404, message: 'Urn ID does not exist' };
              }
            }else{
              return { status: 400, message: 'hardware already exists In Factory Server' };
            }
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
    return `This action returns all gateway`;
  }

  findOne(id: string) {
    return `This action returns a #${id} gateway`;
  }

  update(id: string) {
    return `This action updates a #${id} gateway`;
  }

  remove(id: string) {
    return `This action removes a #${id} gateway`;
  }
}
