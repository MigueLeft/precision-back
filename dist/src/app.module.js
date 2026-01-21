"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./config/database/prisma.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const roles_module_1 = require("./modules/roles/roles.module");
const patients_module_1 = require("./modules/patients/patients.module");
const medics_module_1 = require("./modules/medics/medics.module");
const specialties_module_1 = require("./modules/specialties/specialties.module");
const users_module_1 = require("./modules/users/users.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const reschedules_module_1 = require("./modules/reschedules/reschedules.module");
const patient_follow_module_1 = require("./modules/patient-follow/patient-follow.module");
const contact_attempt_module_1 = require("./modules/contact-attempt/contact-attempt.module");
const rescue_directory_module_1 = require("./modules/rescue-directory/rescue-directory.module");
const questionnaires_module_1 = require("./modules/questionnaires/questionnaires.module");
const antecedents_module_1 = require("./modules/antecedents/antecedents.module");
const physical_examinations_module_1 = require("./modules/physical-examinations/physical-examinations.module");
const symptoms_module_1 = require("./modules/symptoms/symptoms.module");
const diagnostics_module_1 = require("./modules/diagnostics/diagnostics.module");
const treatments_module_1 = require("./modules/treatments/treatments.module");
const medical_studies_module_1 = require("./modules/medical-studies/medical-studies.module");
const laboratory_exams_module_1 = require("./modules/laboratory-exams/laboratory-exams.module");
const prisma_exception_filter_1 = require("./common/filters/prisma-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            permissions_module_1.PermissionsModule,
            roles_module_1.RolesModule,
            patients_module_1.PatientsModule,
            specialties_module_1.SpecialtiesModule,
            medics_module_1.MedicsModule,
            users_module_1.UsersModule,
            appointments_module_1.AppointmentsModule,
            reschedules_module_1.ReschedulesModule,
            patient_follow_module_1.PatientFollowModule,
            contact_attempt_module_1.ContactAttemptModule,
            rescue_directory_module_1.RescueDirectoryModule,
            questionnaires_module_1.QuestionnairesModule,
            antecedents_module_1.AntecedentsModule,
            physical_examinations_module_1.PhysicalExaminationsModule,
            symptoms_module_1.SymptomsModule,
            diagnostics_module_1.DiagnosticsModule,
            treatments_module_1.TreatmentsModule,
            medical_studies_module_1.MedicalStudiesModule,
            laboratory_exams_module_1.LaboratoryExamsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_exception_filter_1.PrismaExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_PIPE,
                useValue: validation_pipe_1.ValidationPipe,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map