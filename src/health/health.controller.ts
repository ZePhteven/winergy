import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly _health: HealthCheckService,
    private readonly _typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this._health.check([() => this._typeOrmHealthIndicator.pingCheck('db')]);
  }
}
