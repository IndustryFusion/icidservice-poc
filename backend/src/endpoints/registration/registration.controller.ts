import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() data) {
    return this.registrationService.create(data);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.registrationService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(id);
  }
}
