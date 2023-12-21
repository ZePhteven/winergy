import { ApiResponseProperty } from '@nestjs/swagger';

export class SearchResponse<T> {
  @ApiResponseProperty()
  data: T[];

  @ApiResponseProperty()
  total: number;
}
