import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BottlesModule } from './bottles/bottles.module';
import { DatabaseConfigService } from './config/database-config.service';
import { HealthModule } from './health/health.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => new DatabaseConfigService(configService).getTypeOrmConfig(),
    }),
    AuthModule,
    HealthModule,
    BottlesModule,
    NotesModule,
    UsersModule,
  ],
})
export class AppModule {}
