import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePhysicalExaminationDto {
  @ApiProperty({
    description: 'Peso en kilogramos',
    example: 75.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(500)
  weight?: number;

  @ApiProperty({
    description: 'Talla en metros',
    example: 1.75,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(3)
  height?: number;

  @ApiProperty({
    description: 'IMC (Índice de Masa Corporal) - calculado automáticamente',
    example: 24.6,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(100)
  bmi?: number;

  @ApiProperty({
    description: 'Presión arterial sistólica en mmHg',
    example: 120,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(50)
  @Max(300)
  bloodPressureSystolic?: number;

  @ApiProperty({
    description: 'Presión arterial diastólica en mmHg',
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(200)
  bloodPressureDiastolic?: number;

  @ApiProperty({
    description: 'Frecuencia cardíaca en latidos por minuto',
    example: 72,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(250)
  heartRate?: number;

  @ApiProperty({
    description: 'Frecuencia respiratoria en respiraciones por minuto',
    example: 16,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(5)
  @Max(60)
  respiratoryRate?: number;

  @ApiProperty({
    description: 'Temperatura corporal en grados Celsius',
    example: 36.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(30)
  @Max(45)
  temperature?: number;

  @ApiProperty({
    description: 'Saturación de oxígeno en porcentaje',
    example: 98,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(50)
  @Max(100)
  oxygenSaturation?: number;

  @ApiProperty({
    description: 'Hallazgos generales del examen físico',
    example: 'Paciente consciente, orientado, colaborador. Buen estado general',
    required: false,
  })
  @IsOptional()
  @IsString()
  generalFindings?: string;

  @ApiProperty({
    description: 'Observaciones adicionales',
    example: 'Paciente refiere cefalea ocasional',
    required: false,
  })
  @IsOptional()
  @IsString()
  additionalObservations?: string;

  @ApiProperty({
    description: 'Profesional que realizó el examen',
    example: 'Dr. Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  performedBy?: string;
}
