import { ApiProperty } from '@nestjs/swagger';

import { Allow } from 'class-validator';
import { ComparatorPrototype } from 'src/shared/models';
import { StringComparator } from 'src/shared/models/comparators';

import { BaseFilter } from 'src/shared/models/dto';

export class BottleFilter extends  BaseFilter {
  @ApiProperty({ type: ComparatorPrototype<StringComparator> })
  @Allow()
  name: ComparatorPrototype<StringComparator>;
}
