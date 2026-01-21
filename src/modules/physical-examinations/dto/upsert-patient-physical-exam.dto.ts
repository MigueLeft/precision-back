import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';

export class UpsertPatientPhysicalExamDto {
  @ApiProperty({
    description: 'Peso en kg',
    example: 75.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiProperty({
    description: 'Altura en cm',
    example: 175,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiProperty({
    description: 'Índice de masa corporal',
    example: 24.6,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  bmi?: number;

  @ApiProperty({
    description: 'Presión arterial sistólica (mmHg)',
    example: 120,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  bloodPressureSystolic?: number;

  @ApiProperty({
    description: 'Presión arterial diastólica (mmHg)',
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  bloodPressureDiastolic?: number;

  @ApiProperty({
    description: 'Frecuencia cardíaca (latidos por minuto)',
    example: 72,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  heartRate?: number;

  @ApiProperty({
    description: 'Frecuencia respiratoria (respiraciones por minuto)',
    example: 16,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  respiratoryRate?: number;

  @ApiProperty({
    description: 'Temperatura corporal (°C)',
    example: 36.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiProperty({
    description: 'Saturación de oxígeno (%)',
    example: 98,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  oxygenSaturation?: number;

  @ApiProperty({
    description: 'Circunferencia de cintura (cm)',
    example: 85,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  waistCircumference?: number;

  @ApiProperty({
    description: 'Circunferencia de cadera (cm)',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  hipCircumference?: number;

  @ApiProperty({
    description: 'Circunferencia de cuello (cm)',
    example: 38,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  neckCircumference?: number;

  @ApiProperty({
    description: 'Porcentaje de grasa corporal',
    example: 20.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  bodyFatPercentage?: number;

  @ApiProperty({
    description: 'Porcentaje de masa muscular',
    example: 35.2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  muscleMassPercentage?: number;

  @ApiProperty({
    description: 'Hallazgos generales',
    example: 'Paciente en buen estado general',
    required: false,
  })
  @IsOptional()
  @IsString()
  generalFindings?: string;

  @ApiProperty({
    description: 'Quién realizó el examen',
    example: 'Dr. Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  performedBy?: string;

  @ApiProperty({
    description: 'Notas adicionales',
    example: 'Control rutinario',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Fecha del examen',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  examinationDate?: string;
}
