import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { BottleSubscriber } from '../bottles/subscribers';
import { NoteSubscriber } from '../notes/subscribers';

export class DatabaseConfigService {
  constructor(private readonly _configService: ConfigService) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this._configService.get(key);
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort(): string {
    return this.getValue('PORT', true);
  }

  public getSSL(): boolean {
    const sslMode = this.getValue('POSTGRES_SSL', false);
    return !sslMode || sslMode === 'true';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    this.ensureValues(['POSTGRES_HOST', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DATABASE']);

    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT', false)),
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

      subscribers: [BottleSubscriber, NoteSubscriber],

      ssl: this.getSSL(),
    };
  }
}
