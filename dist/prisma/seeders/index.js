"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedIM1Questionnaire = exports.seedSymptoms = exports.seedAntecedents = exports.seedUsers = exports.seedRoles = exports.seedPermissions = void 0;
var permissions_seeder_1 = require("./permissions-seeder");
Object.defineProperty(exports, "seedPermissions", { enumerable: true, get: function () { return permissions_seeder_1.seedPermissions; } });
var roles_seeder_1 = require("./roles-seeder");
Object.defineProperty(exports, "seedRoles", { enumerable: true, get: function () { return roles_seeder_1.seedRoles; } });
var users_seeder_1 = require("./users-seeder");
Object.defineProperty(exports, "seedUsers", { enumerable: true, get: function () { return users_seeder_1.seedUsers; } });
var antecedents_seeder_1 = require("./antecedents-seeder");
Object.defineProperty(exports, "seedAntecedents", { enumerable: true, get: function () { return antecedents_seeder_1.seedAntecedents; } });
var symptoms_seeder_1 = require("./symptoms-seeder");
Object.defineProperty(exports, "seedSymptoms", { enumerable: true, get: function () { return symptoms_seeder_1.seedSymptoms; } });
var im1_seeder_1 = require("./im1-seeder");
Object.defineProperty(exports, "seedIM1Questionnaire", { enumerable: true, get: function () { return im1_seeder_1.seedIM1Questionnaire; } });
//# sourceMappingURL=index.js.map