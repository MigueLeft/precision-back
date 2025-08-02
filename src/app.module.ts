import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

// Database
import { PrismaModule } from './config/database/prisma.module'; 

// Modules
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { PatientsModule } from './modules/patients/patients.module';
import { MedicsModule } from './modules/medics/medics.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { ReschedulesModule } from './modules/reschedules/reschedules.module';
import { PatientFollowModule } from './modules/patient-follow/patient-follow.module';
import { ContactAttemptModule } from './modules/contact-attempt/contact-attempt.module';
import { RescueDirectoryModule } from './modules/rescue-directory/rescue-directory.module';


// Common
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';

// Controllers and Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database
    PrismaModule,
 
    // Feature Modules
    PermissionsModule,
    RolesModule,
    PatientsModule,
    SpecialtiesModule,
    MedicsModule,
    UsersModule,
    AppointmentsModule,
    ReschedulesModule,
    PatientFollowModule,
    ContactAttemptModule,
    RescueDirectoryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    
    // Global Response Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    
    // Global Validation Pipe
    {
      provide: APP_PIPE,
      useValue: ValidationPipe,
    },
  ],
})
export class AppModule {}