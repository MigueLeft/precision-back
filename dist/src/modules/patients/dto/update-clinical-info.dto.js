"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClinicalInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateClinicalInfoDto {
    currentIllness;
    diagnosticPlan;
    lastClinicalUpdateBy;
}
exports.UpdateClinicalInfoDto = UpdateClinicalInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current illness - detailed clinical description',
        example: 'Paciente acude a consulta refiriendo cuadro clínico de aproximadamente 2 semanas de evolución caracterizado por cefalea frontal de moderada intensidad, intermitente, que mejora parcialmente con analgésicos comunes. Asocia sensación de mareo ocasional y visión borrosa al realizar esfuerzos. Niega náuseas, vómitos o alteraciones de la conciencia. Refiere antecedentes de hipertensión arterial en tratamiento irregular. Al examen físico se encuentra presión arterial de 150/95 mmHg, frecuencia cardíaca de 88 lpm, afebril. Resto del examen físico sin alteraciones significativas.',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClinicalInfoDto.prototype, "currentIllness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Diagnostic plan - list of diagnostic procedures and follow-up',
        example: '1. Solicitar perfil lipídico completo, glucemia en ayunas y hemoglobina glicosilada para evaluar control metabólico.\n2. Realizar electrocardiograma de 12 derivaciones para descartar alteraciones cardíacas asociadas a hipertensión.\n3. Solicitar creatinina sérica y depuración de creatinina para evaluar función renal.\n4. Programar monitoreo ambulatorio de presión arterial (MAPA) de 24 horas.\n5. Fondoscopia para evaluar retinopatía hipertensiva.\n6. Educación sobre adherencia al tratamiento antihipertensivo y modificaciones en el estilo de vida.\n7. Control en 2 semanas para evaluar respuesta al tratamiento y resultados de laboratorio.\n8. Considerar ajuste de dosis de antihipertensivos según evolución y cifras tensionales.',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClinicalInfoDto.prototype, "diagnosticPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the physician updating clinical information',
        example: 'clxxx987654321',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClinicalInfoDto.prototype, "lastClinicalUpdateBy", void 0);
//# sourceMappingURL=update-clinical-info.dto.js.map