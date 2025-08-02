import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotPastDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isNotPastDate',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (!value) return false;
            const inputDate = new Date(value);
            const currentDate = new Date();
            
            // Set current date to start of day for comparison
            currentDate.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);
            
            return inputDate >= currentDate;
          },
          defaultMessage(args: ValidationArguments) {
            return 'La fecha de la cita no puede ser anterior al día actual';
          },
        },
      });
    };
  }