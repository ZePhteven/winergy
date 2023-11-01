import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBottleDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  producerId: number;

  @ApiProperty()
  retailerId: number;

  @ApiProperty()
  type: number;

  @ApiProperty()
  year: number;
}
