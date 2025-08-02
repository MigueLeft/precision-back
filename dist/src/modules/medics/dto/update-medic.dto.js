"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_medic_dto_1 = require("./create-medic.dto");
class UpdateMedicDto extends (0, swagger_1.PartialType)(create_medic_dto_1.CreateMedicDto) {
}
exports.UpdateMedicDto = UpdateMedicDto;
//# sourceMappingURL=update-medic.dto.js.map