import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto, CreateBindingDto } from './dto/create-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('/binding')
  createBinding(@Body() createBindingDto: CreateBindingDto) {  
    return this.contractService.createBinding(createBindingDto);
  }

  @Post()
  createContract(@Body() createContractDto: CreateContractDto) {
    return this.contractService.createContract(createContractDto);
  }
}
