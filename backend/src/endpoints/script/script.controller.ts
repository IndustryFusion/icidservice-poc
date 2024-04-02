import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScriptService } from './script.service';

@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post()
  create() {
    try{
      return this.scriptService.create();
    }catch(err){
      console.log('err ',err);
    }
  }

  @Get()
  findAll() {
    return this.scriptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.scriptService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptService.remove(+id);
  }
}
