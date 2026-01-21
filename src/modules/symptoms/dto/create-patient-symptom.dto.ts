import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsIn,
  IsDateString,
} from 'class-validator';
import { IsCuidId } from '../../../common/decorators/id-validation.decorator';

export class CreatePatientSymptomDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'cmg4iykys0000u8wkx0o1qepf',
  })
  @IsCuidId()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'ID del síntoma',
    example: 'uuid-del-sintoma',
  })
  @IsUUID()
  @IsNotEmpty()
  symptomId: string;

  @ApiProperty({
    description: 'Si el paciente tiene el síntoma',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  hasSymptom?: boolean = true;

  @ApiProperty({
    description: 'Severidad del síntoma para este paciente',
    example: 'moderate',
    enum: ['mild', 'moderate', 'severe'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['mild', 'moderate', 'severe'])
  severity?: string;

  @ApiProperty({
    description: 'Frecuencia del síntoma',
    example: 'daily',
    enum: ['daily', 'weekly', 'monthly', 'occasionally'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['daily', 'weekly', 'monthly', 'occasionally'])
  frequency?: string;

  @ApiProperty({
    description: 'Duración que ha tenido el síntoma',
    example: '2 semanas',
    required: false,
  })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({
    description: 'Notas adicionales sobre el síntoma',
    example: 'Dolor intenso por las mañanas',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Fecha cuando se reportó el síntoma',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  reportedAt?: string;
}
