import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CheckService } from './check.service';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Get('/server')
  verifyServerId(@Query('id') id: string) {
    try {
      return this.checkService.verifyServerId(id);
    } catch(err) {
      return err.response;
    }
  }

  @Get('/gateway')
  verifyGatewayId(@Query('id') id: string) {
    try {
      return this.checkService.verifyGatewayId(id);
    } catch(err) {
      return err.response;
    }
  }

  @Get('/company')
  verifyCompanyId(@Query('id') id: string) {
    try {
      return this.checkService.verifyCompanyId(id);
    } catch(err) {
      return err.response;
    }
  }
}
