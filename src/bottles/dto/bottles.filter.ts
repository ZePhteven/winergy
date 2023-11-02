import { ApiProperty } from '@nestjs/swagger';

import { Allow } from 'class-validator';
import { ComparatorPrototype } from 'src/shared/models';
import { RangeComparator, StringComparator } from 'src/shared/models/comparators';

import { BaseFilter } from 'src/shared/models/dto';

export class BottlesFilter extends BaseFilter {
  @ApiProperty({ type: ComparatorPrototype<StringComparator> })
  @Allow()
  name: ComparatorPrototype<StringComparator>;

  @ApiProperty({ type: ComparatorPrototype<RangeComparator> })
  @Allow()
  price: ComparatorPrototype<RangeComparator>;
}
