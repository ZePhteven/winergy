import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  bottleId: number;

  @ApiProperty()
  expertId: number;

  @ApiProperty()
  note: number;
}
