import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsInt,
  MinLength,
  MaxLength,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          const inputDate = new Date(value);
          const currentDate = new Date();

          // Set current date to start of day for comparison
          currentDate.setHours(23, 59, 59, 999);

          return inputDate <= currentDate;
        },
        defaultMessage(args: ValidationArguments) {
          return 'La fecha de nacimiento no puede ser en el futuro';
        },
      },
    });
  };
}

export class CreatePatientDto {
  @ApiProperty({
    description: 'Nombre del paciente',
    example: 'Juan',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @ApiProperty({
    description: 'Apellido del paciente',
    example: 'Pérez',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiPropertyOptional({
    description: 'Número de identificación único',
    example: '12345678',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  @Transform(({ value }) => value?.trim() || undefined)
  identification?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono',
    example: '+57 300 123 4567',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  @Transform(({ value }) => value?.trim())
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'Fecha de nacimiento (ISO 8601) - No puede ser en el futuro',
    example: '1990-05-15T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotFutureDate({
    message: 'La fecha de nacimiento no puede ser en el futuro',
  })
  birthdate: string;

  @ApiProperty({
    description: 'Género del paciente',
    example: 'Masculino',
  })
  @IsString()
  gender: string;

  @ApiPropertyOptional({
    description: 'Estado activo del paciente',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean = true;

  @ApiPropertyOptional({
    description: 'ID del usuario asociado (opcional)',
    example: 'cluid123',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ description: 'Nacionalidad', example: 'Colombiana' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional({ description: 'País de origen', example: 'Colombia' })
  @IsString()
  @IsOptional()
  countryOfOrigin?: string;

  @ApiPropertyOptional({
    description: 'País de residencia',
    example: 'Colombia',
  })
  @IsString()
  @IsOptional()
  countryOfResidence?: string;

  @ApiPropertyOptional({
    description: 'Dirección de residencia',
    example: 'Calle 123 #45-67',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'Ciudad', example: 'Bogotá' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'Estado civil',
    example: 'soltero',
  })
  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @ApiPropertyOptional({ description: 'Raza', example: 'latina' })
  @IsString()
  @IsOptional()
  race?: string;

  @ApiPropertyOptional({
    description: 'Idioma preferido',
    example: 'español',
  })
  @IsString()
  @IsOptional()
  preferredLanguage?: string;

  @ApiPropertyOptional({
    description: 'Nivel educativo',
    example: '8',
  })
  @IsString()
  @IsOptional()
  educationLevel?: string;

  @ApiPropertyOptional({
    description: 'Estatus socioeconómico (1-10)',
    example: 5,
  })
  @IsInt()
  @IsOptional()
  socioeconomicStatus?: number;

  @ApiPropertyOptional({
    description: 'Tipo de identificación',
    example: 'cedula',
  })
  @IsString()
  @IsOptional()
  identificationType?: string;
}
