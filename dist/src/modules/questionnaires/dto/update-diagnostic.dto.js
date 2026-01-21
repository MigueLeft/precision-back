"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiagnosticDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_diagnostic_dto_1 = require("./create-diagnostic.dto");
class UpdateDiagnosticDto extends (0, swagger_1.PartialType)(create_diagnostic_dto_1.CreateDiagnosticDto) {
}
exports.UpdateDiagnosticDto = UpdateDiagnosticDto;
//# sourceMappingURL=update-diagnostic.dto.js.map