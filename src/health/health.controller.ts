import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { Public } from 'src/shared/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly _health: HealthCheckService,
    private readonly _typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  public check() {
    return this._health.check([() => this._typeOrmHealthIndicator.pingCheck('db')]);
  }
}
