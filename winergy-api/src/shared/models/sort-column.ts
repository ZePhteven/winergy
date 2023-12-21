import { ApiProperty } from '@nestjs/swagger';

import { Allow } from 'class-validator';

export class SortColumn {
  @ApiProperty()
  @Allow()
  name: string;

  @ApiProperty()
  @Allow()
  direction: 'asc' | 'desc' | 'ASC' | 'DESC';
}
