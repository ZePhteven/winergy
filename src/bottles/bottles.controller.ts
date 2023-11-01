import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BottlesService } from './bottles.service';
import { CreateBottleDto } from './dto/create-bottle.dto';
import { UpdateBottleDto } from './dto/update-bottle.dto';
import { BottleEntity } from './entities';

@ApiTags('Bottles')
@Controller('bottles')
export class BottlesController {
  constructor(private readonly bottlesService: BottlesService) {}

  @Post()
  public create(@Body() createDto: CreateBottleDto): Promise<BottleEntity> {
    return this.bottlesService.create(createDto);
  }

  @Get(':id')
  public get(@Param('id') id: string): Promise<BottleEntity> {
    return this.bottlesService.get(+id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateDto: UpdateBottleDto): Promise<void> {
    return this.bottlesService.update(+id, updateDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this.bottlesService.remove(+id);
  }
}
