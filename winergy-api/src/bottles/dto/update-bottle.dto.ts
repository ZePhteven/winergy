import { PartialType } from '@nestjs/swagger';

import { CreateBottleDto } from './create-bottle.dto';

export class UpdateBottleDto extends PartialType(CreateBottleDto) {}
