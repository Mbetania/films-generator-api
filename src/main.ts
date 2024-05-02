import helmet from 'helmet';

import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AppValidationPipe,
  HttpExceptionsFilter,
  swaggerConfig,
} from './infrastructure';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(AppValidationPipe);
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapter, configService));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '3' });

  const NODE_PORT = configService.get<string>('NODE_PORT');
  const NODE_ENV = configService.get<string>('NODE_ENV');

  swaggerConfig(app);

  await app.listen(NODE_PORT, () => {
    Logger.log(`Server in environment: [${NODE_ENV}]`);
    Logger.log(`API listening on port: [${NODE_PORT}]`);
  });
}
bootstrap();
