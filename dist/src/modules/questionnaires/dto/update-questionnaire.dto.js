"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionnaireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_questionnaire_dto_1 = require("./create-questionnaire.dto");
class UpdateQuestionnaireDto extends (0, swagger_1.PartialType)(create_questionnaire_dto_1.CreateQuestionnaireDto) {
}
exports.UpdateQuestionnaireDto = UpdateQuestionnaireDto;
//# sourceMappingURL=update-questionnaire.dto.js.map