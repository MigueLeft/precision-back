"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSymptomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_symptom_dto_1 = require("./create-symptom.dto");
class UpdateSymptomDto extends (0, swagger_1.PartialType)(create_symptom_dto_1.CreateSymptomDto) {
}
exports.UpdateSymptomDto = UpdateSymptomDto;
//# sourceMappingURL=update-symptom.dto.js.map