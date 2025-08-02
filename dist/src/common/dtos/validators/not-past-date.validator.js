"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotPastDate = IsNotPastDate;
const class_validator_1 = require("class-validator");
function IsNotPastDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotPastDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (!value)
                        return false;
                    const inputDate = new Date(value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    inputDate.setHours(0, 0, 0, 0);
                    return inputDate >= currentDate;
                },
                defaultMessage(args) {
                    return 'La fecha de la cita no puede ser anterior al día actual';
                },
            },
        });
    };
}
//# sourceMappingURL=not-past-date.validator.js.map