import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// Helper function to validate different ID formats
export function isValidId(
  value: string,
  idType: 'uuid' | 'cuid' | 'auto',
): boolean {
  if (!value || typeof value !== 'string') return false;

  switch (idType) {
    case 'uuid':
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      );
    case 'cuid':
      return /^c[a-z0-9]{24}$/i.test(value);
    case 'auto':
      return /^\d+$/.test(value);
    default:
      return false;
  }
}

// Decorator for UUID validation
export function IsUuidId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUuidId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isValidId(value, 'uuid');
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid UUID`;
        },
      },
    });
  };
}

// Decorator for CUID validation
export function IsCuidId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCuidId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isValidId(value, 'cuid');
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid CUID`;
        },
      },
    });
  };
}

// Decorator for Auto-increment ID validation
export function IsAutoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAutoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isValidId(value, 'auto');
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid auto-increment ID`;
        },
      },
    });
  };
}

// Combined decorator for flexible ID validation (UUID or CUID)
export function IsFlexibleId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFlexibleId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isValidId(value, 'uuid') || isValidId(value, 'cuid');
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid UUID or CUID`;
        },
      },
    });
  };
}
