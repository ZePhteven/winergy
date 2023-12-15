import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from './../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  setupSwagger(app);

  await app.listen(process.env.PORT);
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('WinErgy API')
    .setDescription('WinErgy API')
    .setVersion(version)
    .addBearerAuth()
    .addSecurityRequirements('bearer');

  const doc = options.build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('', app, document);
}

bootstrap();
