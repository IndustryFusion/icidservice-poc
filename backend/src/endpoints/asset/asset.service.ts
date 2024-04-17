import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Urn } from 'src/schemas/urn.schema';
import { Asset } from 'src/schemas/asset.schema';
import { ObjectSubType } from 'src/schemas/objectSubType.schema';
import { ObjectType } from 'src/schemas/objectType.schema';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import * as moment from 'moment';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name)
    private assetModel: Model<Asset>,
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
          let response = await this.assetModel.find({machine_serial_number: data.machine_serial_number});
          if(!(response.length > 0)){
            let uuid = uuidv5(data.machine_serial_number, this.ifricId);
            let ifricId = `urn:ifric:${data.dataspace_code.toLowerCase()}-${data.region_code.toLowerCase()}-${data.object_type_code.toLowerCase()}-${data.object_sub_type_code.toLowerCase()}-${uuid}`;
            const urnData = new this.urnModel({
              urn: ifricId,
              created_at: moment().format(),
              last_updated_at: moment().format()
            })
            await urnData.save();
            let urnResponse = await this.urnModel.find({urn: ifricId});
            if(urnResponse.length > 0){
              const assetData = new this.assetModel({
                machine_serial_number: data.machine_serial_number,
                urn_id: urnResponse[0].id,
                created_at: moment().format(),
                last_updated_at: moment().format()
              })
              await assetData.save();
              return { status: 201, message: 'Asset created successfully', urn_id: ifricId };
            } else{
              return { status: 404, message: 'Urn ID does not exist' };
            }
          }else{
            return { status: 400, message: 'Machine Serial Number already exists' };
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
    return `This action returns all asset`;
  }

  findOne(id: string) {
    return `This action returns a #${id} asset`;
  }

  update(id: string) {
    return `This action updates a #${id} asset`;
  }

  remove(id: string) {
    return `This action removes a #${id} asset`;
  }
}
