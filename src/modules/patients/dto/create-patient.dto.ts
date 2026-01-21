import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsBoolean,
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

  @ApiProperty({
    description: 'Número de identificación único',
    example: '12345678',
    minLength: 5,
    maxLength: 20,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value?.trim())
  identification: string;

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
}
