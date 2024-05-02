import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication<any>) => {
  const options = new DocumentBuilder()
    .setTitle('Film API')
    .setDescription('Film REST API Documentation')
    .setVersion('1.0')
    .addTag('Film')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {});
};
