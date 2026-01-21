"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = isValidId;
exports.IsUuidId = IsUuidId;
exports.IsCuidId = IsCuidId;
exports.IsAutoId = IsAutoId;
exports.IsFlexibleId = IsFlexibleId;
const class_validator_1 = require("class-validator");
function isValidId(value, idType) {
    if (!value || typeof value !== 'string')
        return false;
    switch (idType) {
        case 'uuid':
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
        case 'cuid':
            return /^c[a-z0-9]{24}$/i.test(value);
        case 'auto':
            return /^\d+$/.test(value);
        default:
            return false;
    }
}
function IsUuidId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isUuidId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return isValidId(value, 'uuid');
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid UUID`;
                },
            },
        });
    };
}
function IsCuidId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCuidId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return isValidId(value, 'cuid');
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid CUID`;
                },
            },
        });
    };
}
function IsAutoId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isAutoId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return isValidId(value, 'auto');
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid auto-increment ID`;
                },
            },
        });
    };
}
function IsFlexibleId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isFlexibleId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return isValidId(value, 'uuid') || isValidId(value, 'cuid');
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid UUID or CUID`;
                },
            },
        });
    };
}
//# sourceMappingURL=id-validation.decorator.js.map