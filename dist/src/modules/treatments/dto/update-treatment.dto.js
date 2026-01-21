"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTreatmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_treatment_dto_1 = require("./create-treatment.dto");
class UpdateTreatmentDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_treatment_dto_1.CreateTreatmentDto, ['patientId'])) {
}
exports.UpdateTreatmentDto = UpdateTreatmentDto;
//# sourceMappingURL=update-treatment.dto.js.map