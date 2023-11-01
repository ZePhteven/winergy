import { ApiProperty } from '@nestjs/swagger';

import { Allow } from 'class-validator';

export class BaseFilter {
  @ApiProperty()
  @Allow()
  id: number[];
}
