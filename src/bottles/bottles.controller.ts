import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/shared/controllers';

import { BottlesService } from './bottles.service';
import { BottleFilter, CreateBottleDto, UpdateBottleDto } from './dto';
import { BottleEntity } from './entities';

@ApiTags('Bottles')
@Controller('bottles')
export class BottlesController extends BaseController<BottleFilter, BottleEntity> {
  constructor(protected readonly _service: BottlesService) {
    super(_service);
  }

  @Post()
  public create(@Body() createDto: CreateBottleDto): Promise<BottleEntity> {
    return this._service.create(createDto);
  }

  @Get(':id')
  public get(@Param('id') id: string): Promise<BottleEntity> {
    return this._service.get(+id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateDto: UpdateBottleDto): Promise<void> {
    return this._service.update(+id, updateDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this._service.remove(+id);
  }
}
