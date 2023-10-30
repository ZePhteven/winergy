import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly _health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  public check() {
    return this._health.check([]);
  }
}
