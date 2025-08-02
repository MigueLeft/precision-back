"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Medical System API')
        .setDescription('API para sistema médico con gestión de roles, permisos y pacientes')
        .setVersion('1.0')
        .addTag('users', 'Gestión de usuarios')
        .addTag('roles', 'Gestión de roles')
        .addTag('permissions', 'Gestión de permisos')
        .addTag('patients', 'Gestión de pacientes')
        .addTag('medics', 'Gestión de médicos')
        .addTag('appointments', 'Gestión de citas')
        .addTag('reschedules', 'Gestión de Reprogramaciones')
        .addTag('PatientFollow', 'Seguimiento de pacientes')
        .addTag('ContactAttempt', 'Intentos de contacto')
        .addTag('RescueDirectory', 'Directorio de rescate')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
//# sourceMappingURL=main.js.map