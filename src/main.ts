import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Precision Care Clinis API')
    // .setDescription('API para sistema médico con gestión de roles, permisos y pacientes')
    .setVersion('1.0')
    .addTag('Users', 'Gestión de usuarios')
    .addTag('Roles', 'Gestión de roles')
    .addTag('Permissions', 'Gestión de permisos')
    .addTag('Patients', 'Gestión de pacientes')
    .addTag('Medics', 'Gestión de médicos')
    .addTag('Appointments', 'Gestión de citas')
    .addTag('Reschedules', 'Gestión de Reprogramaciones')
    .addTag('PatientFollow', 'Seguimiento de pacientes')
    .addTag('ContactAttempt', 'Intentos de contacto')
    .addTag('RescueDirectory', 'Directorio de rescate')
    .addTag('Specialties', 'Especialidades')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
  logger.log(`👥 Patients API: http://localhost:${port}/api/v1/patients`);
  logger.log(`🔄 Patient Follow API: http://localhost:${port}/api/v1/patient-follow`);
  logger.log(`📞 Contact Attempt API: http://localhost:${port}/api/v1/contact-attempt`);
  logger.log(`🆘 Rescue Directory API: http://localhost:${port}/api/v1/rescue-directory`);
}

bootstrap();