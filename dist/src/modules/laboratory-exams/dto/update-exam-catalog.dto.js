"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamCatalogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_exam_catalog_dto_1 = require("./create-exam-catalog.dto");
class UpdateExamCatalogDto extends (0, swagger_1.PartialType)(create_exam_catalog_dto_1.CreateExamCatalogDto) {
}
exports.UpdateExamCatalogDto = UpdateExamCatalogDto;
//# sourceMappingURL=update-exam-catalog.dto.js.map