import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePhysicalExaminationDto {
  @ApiProperty({ description: 'Peso en kilogramos', example: 75.5, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(500)
  weight?: number;

  @ApiProperty({ description: 'Talla en metros', example: 1.75, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  height?: number;

  @ApiProperty({ description: 'IMC calculado automáticamente', example: 24.6, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(100)
  bmi?: number;

  @ApiProperty({ description: 'Presión arterial sistólica en mmHg', example: 120, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(50)
  @Max(300)
  bloodPressureSystolic?: number;

  @ApiProperty({ description: 'Presión arterial diastólica en mmHg', example: 80, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(200)
  bloodPressureDiastolic?: number;

  @ApiProperty({ description: 'Frecuencia cardíaca en lpm', example: 72, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(30)
  @Max(250)
  heartRate?: number;

  @ApiProperty({ description: 'Frecuencia respiratoria en rpm', example: 16, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(5)
  @Max(60)
  respiratoryRate?: number;

  @ApiProperty({ description: 'Temperatura corporal en °C', example: 36.5, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(30)
  @Max(45)
  temperature?: number;

  @ApiProperty({ description: 'Saturación de oxígeno en %', example: 98, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(50)
  @Max(100)
  oxygenSaturation?: number;

  @ApiProperty({ description: 'Circunferencia abdominal en cm', example: 85, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(300)
  waistCircumference?: number;

  @ApiProperty({ description: 'Circunferencia de cadera en cm', example: 95, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(300)
  hipCircumference?: number;

  @ApiProperty({ description: 'Circunferencia del cuello en cm', example: 38, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(100)
  neckCircumference?: number;

  @ApiProperty({ description: 'Porcentaje de grasa corporal', example: 20.5, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(100)
  bodyFatPercentage?: number;

  @ApiProperty({ description: 'Grasa corporal en kg', example: 15.4, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(300)
  bodyFatKg?: number;

  @ApiProperty({ description: 'Porcentaje de masa muscular', example: 40.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(100)
  muscleMassPercentage?: number;

  @ApiProperty({ description: 'Masa muscular en kg', example: 30.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(300)
  muscleMassKg?: number;

  @ApiProperty({ description: 'Índice cintura-cadera', example: 0.85, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Type(() => Number)
  @Min(0)
  @Max(2)
  waistHipRatio?: number;

  @ApiProperty({ description: 'Fuerza de mano derecha en kg', example: 35.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(200)
  gripStrengthRight?: number;

  @ApiProperty({ description: 'Fuerza de mano izquierda en kg', example: 32.0, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0)
  @Max(200)
  gripStrengthLeft?: number;

  @ApiProperty({ description: 'Hallazgos generales', required: false })
  @IsOptional()
  @IsString()
  generalFindings?: string;

  @ApiProperty({ description: 'Observaciones adicionales', required: false })
  @IsOptional()
  @IsString()
  additionalObservations?: string;

  @ApiProperty({ description: 'Profesional que realizó el examen', required: false })
  @IsOptional()
  @IsString()
  performedBy?: string;
}
