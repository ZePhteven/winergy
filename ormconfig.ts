import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `.env.development` });
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: parseInt(configService.get<string>('POSTGRES_PORT')),
  database: configService.get<string>('POSTGRES_DATABASE'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  // synchronize: true,
  logging: false,
  entities: ['src/**/entities/*{.ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  subscribers: [],
  migrationsRun: true,
});

export default AppDataSource;
