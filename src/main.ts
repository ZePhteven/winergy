import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from './../package.json';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.PORT);
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('WinErgy API')
    .setDescription('WinErgy API')
    .setVersion(version);

  const doc = options.build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('', app, document);
}

bootstrap();
