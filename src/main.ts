import 'dotenv/config'; // 1. Importante para leer variables de entorno
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common'; // 2. Agregamos ValidationPipe
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 3. Configuración de Pipes (Copiado del segundo archivo para que los datos lleguen bien)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  // 4. CORS mejorado (Copiado del segundo archivo)
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://lown-scholars-platform.vercel.app', // Tu URL de producción
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Prefijo Global
  // app.setGlobalPrefix('api/v1');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Precision Care Clinis API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    // Esto ayuda a que Swagger cargue mejor en Vercel
    customSiteTitle: 'Precision Care API Docs',
  });

  // 5. Puerto dinámico para Vercel
  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`🚀 Application running on: http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();