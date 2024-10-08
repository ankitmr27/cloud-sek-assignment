import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Post Comment Service API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token',
    }) // Adds a Bearer Auth option
    .addSecurityRequirements('bearer')
    .build();

  app.enableVersioning({
    type: VersioningType.URI, // Enables versioning via URI
  });

  app.setGlobalPrefix('/api'); // Sets the global prefix for your routes
  app.use(json({ limit: '100kb' })); // Sets the body size limit
  app.useGlobalPipes(new ValidationPipe()); // Enables global validation

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Sets up Swagger UI

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log(
      `Swagger UI is available at http://localhost:${process.env.PORT || 3000}/docs`,
    );
  });
}
bootstrap();
