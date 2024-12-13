// 
// Copyright (c) 2024 IB Systems GmbH 
// 
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
// 
// http://www.apache.org/licenses/LICENSE-2.0 
// 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 
// 

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    description: 'Create User details',
    required: true,
    schema: {
      type: 'object',
      properties: {
        employee_code: {
          type: 'string',
          example: 'EMP123456',
        },
        company_id: {
          type: 'string',
          example: 'C78910',
        },
        dataspace_code: {
          type: 'string',
          example: 'DS001',
        },
        region_code: {
          type: 'string',
          example: 'US-WEST',
        },
        object_type_code: {
          type: 'string',
          example: 'TYPE123',
        },
        object_sub_type_code: {
          type: 'string',
          example: 'SUBTYPE456',
        },
        registration_number: {
          type: 'string',
          example: 'REG12345',
        },
      },
      required: [
        'employee_code',
        'company_id',
        'dataspace_code',
        'region_code',
        'object_type_code',
        'object_sub_type_code',
        'registration_number',
      ],
    },
  })
  create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
