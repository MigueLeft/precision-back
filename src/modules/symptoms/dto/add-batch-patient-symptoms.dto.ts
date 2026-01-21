import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

class SymptomItemDto {
  @ApiProperty({
    description: 'ID del síntoma',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUuidId()
  symptomId: string;

  @ApiProperty({
    description: 'Severidad del síntoma',
    enum: ['mild', 'moderate', 'severe', 'critical'],
    example: 'moderate',
    required: false,
  })
  @IsOptional()
  @IsEnum(['mild', 'moderate', 'severe', 'critical'])
  severity?: string;

  @ApiProperty({
    description: 'Frecuencia del síntoma',
    example: 'Daily',
    required: false,
  })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiProperty({
    description: 'Duración del síntoma',
    example: '2 weeks',
    required: false,
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({
    description: 'Fecha en que se reportó el síntoma',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  reportedAt?: string;

  @ApiProperty({
    description: 'Notas adicionales sobre el síntoma',
    example: 'El paciente reporta que empeora por las noches',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddBatchPatientSymptomsDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'clxxx123',
  })
  @IsString()
  patientId: string;

  @ApiProperty({
    description: 'Lista de síntomas a agregar al paciente',
    type: [SymptomItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SymptomItemDto)
  symptoms: SymptomItemDto[];
}
