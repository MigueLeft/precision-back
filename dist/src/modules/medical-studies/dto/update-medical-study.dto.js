"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicalStudyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_medical_study_dto_1 = require("./create-medical-study.dto");
class UpdateMedicalStudyDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_medical_study_dto_1.CreateMedicalStudyDto, ['patientId'])) {
}
exports.UpdateMedicalStudyDto = UpdateMedicalStudyDto;
//# sourceMappingURL=update-medical-study.dto.js.map