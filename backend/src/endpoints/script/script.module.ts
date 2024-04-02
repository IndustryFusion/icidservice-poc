import { Module } from '@nestjs/common';
import { ScriptService } from './script.service';
import { ScriptController } from './script.controller';

@Module({
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
