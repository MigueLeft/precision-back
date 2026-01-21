import { ValidationOptions } from 'class-validator';
export declare function isValidId(value: string, idType: 'uuid' | 'cuid' | 'auto'): boolean;
export declare function IsUuidId(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsCuidId(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsAutoId(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsFlexibleId(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
