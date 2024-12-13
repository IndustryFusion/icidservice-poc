import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto, CreateBindingDto } from './dto/create-contract.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('/binding')
  @ApiBody({
    description: 'Create Binding details',
    required: true,
    schema: {
      type: 'object',
      properties: {
        data_consumer_company_ifric_id: {
          type: 'string',
          example: 'C123456789',
        },
        data_provider_company_ifric_id: {
          type: 'string',
          example: 'P987654321',
        },
        binding_datetime_string: {
          type: 'string',
          format: 'date-time',
          example: '2025-12-31T10:00:00Z',
        },
      },
      required: ['data_consumer_company_ifric_id', 'data_provider_company_ifric_id', 'binding_datetime_string'],
    },
  })  
  createBinding(@Body() createBindingDto: CreateBindingDto) {  
    return this.contractService.createBinding(createBindingDto);
  }

  @Post()
  @ApiBody({
    description: 'Create Contract details',
    required: true,
    schema: {
      type: 'object',
      properties: {
        data_consumer_company_ifric_id: {
          type: 'string',
          example: 'C123456789',
        },
        contract_datetime_string: {
          type: 'string',
          format: 'date-time',
          example: '2025-12-31T10:00:00Z',
        },
      },
      required: ['data_consumer_company_ifric_id', 'contract_datetime_string'],
    },
  })  
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }
}
