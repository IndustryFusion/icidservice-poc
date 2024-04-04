import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  create(@Body() data: any) {
    return this.gatewayService.create(data);
  }

  @Get()
  findAll() {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gatewayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.gatewayService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gatewayService.remove(id);
  }
}
