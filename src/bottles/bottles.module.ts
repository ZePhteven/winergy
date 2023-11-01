import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BottlesController } from './bottles.controller';
import { BottlesService } from './bottles.service';
import { BottleEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([BottleEntity])],
  controllers: [BottlesController],
  providers: [BottlesService],
})
export class BottlesModule {}
