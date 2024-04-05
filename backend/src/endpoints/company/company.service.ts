import { Injectable } from '@nestjs/common';
import { Country } from 'src/schemas/country.schema';
import { Company } from 'src/schemas/company.schema';
import { ObjectSubType } from 'src/schemas/objectSubType.schema';
import { ObjectType } from 'src/schemas/objectType.schema';
import { Urn } from 'src/schemas/urn.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import * as moment from 'moment';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    @InjectModel(Country.name)
    private countryModel: Model<Country>,
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
      let countryResponse = await this.countryModel.find({country_code: data.country_code.toUpperCase()});
      if(countryResponse.length > 0){
        let objectSubTypeResponse = await this.objectSubTypeModel.find({object_sub_type_code: data.object_sub_type_code.toUpperCase()});
        if(objectSubTypeResponse.length > 0){
          let objectTypeData = await this.ObjectTypeModel.findById(objectSubTypeResponse[0].object_type_id);
          if(objectTypeData && objectTypeData.object_type_code == data.object_type_code){
            let response = await this.companyModel.find({registration_code: data.registration_code});
            if(!response.length){
              let uuid = uuidv5(data.country_code.toUpperCase() + data.registration_code, this.ifricId);
              let ifricId = `urn:ifric:${data.dataspace_code}-${data.region_code}-${data.object_type_code}-${data.object_sub_type_code}-${uuid}`;
              const urnData = new this.urnModel({
                urn: ifricId,
                created_at: moment().format(),
                last_updated_at: moment().format()
              })
              await urnData.save();
              let urnResponse = await this.urnModel.find({urn: ifricId});
              if(urnResponse.length > 0){
                const companyData = new this.companyModel({
                  registration_code: data.registration_code,
                  country_id: data.country_id,
                  urn_id: urnResponse[0].id,
                  created_at: moment().format(),
                  last_updated_at: moment().format()
                })
                await companyData.save();
                return { status: 201, message: 'Company created successfully' };
              } else{
                return { status: 404, message: 'Urn ID does not exist' };
              }
            }else{
              return { status: 400, message: 'Company Registration ID already exists' };
            }
          }else{
            return { status: 400, message: 'Invalid Object Sub Type Code' };
          }
        }else{
          return { status: 404, message: 'Object Sub Type Code does not exist' };
        }
      }else{
        return { status: 404, message: 'Country ID does not exist' };
      }
    }catch(err){
      return err;
    }
  }

  findAll() {
    return `This action returns all company`;
  } 

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  update(id: string) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
