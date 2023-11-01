import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfigService {
  constructor(private readonly _configService: ConfigService) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this._configService.get(key);
    console.log(key, value);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    this.ensureValues(['POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DATABASE']);

    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      autoLoadEntities: true,

      // entities: ['**/*.entity{.ts,.js}'],

      // migrationsTableName: 'migration',

      // migrations: ['src/migration/*.ts'],

      //   cli: {
      //     migrationsDir: 'src/migration',
      //   },

      ssl: this.isProduction(),
    };
  }
}
