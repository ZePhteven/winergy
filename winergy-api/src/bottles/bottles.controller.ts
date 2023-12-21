import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from '../shared/controllers';
import { BottlesService } from './bottles.service';
import { BottlesFilter, CreateBottleDto, UpdateBottleDto } from './dto';
import { BottleEntity, BottlePriceHistoryEntity } from './entities';

@ApiTags('Bottles')
@Controller({
  path: 'bottles',
  version: '1',
})
export class BottlesController extends BaseController<BottlesFilter, BottleEntity> {
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

  @Get(':id/price/history')
  public getPriceHistory(@Param('id') bottleId: string): Promise<BottlePriceHistoryEntity[]> {
    return this._service.getPriceHistory(+bottleId);
  }
}
