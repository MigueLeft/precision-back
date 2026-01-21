import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class TreatmentItemDto {
  @ApiProperty({
    description: 'Nombre del medicamento',
    example: 'Metformina',
  })
  @IsString()
  medicationName: string;

  @ApiProperty({
    description: 'Presentación del medicamento',
    example: 'Tabletas 850mg',
    required: false,
  })
  @IsOptional()
  @IsString()
  presentation?: string;

  @ApiProperty({
    description: 'Cantidad prescrita',
    example: '30 tabletas',
    required: false,
  })
  @IsOptional()
  @IsString()
  quantity?: string;

  @ApiProperty({
    description: 'Dosificación',
    example: '1 tableta cada 12 horas',
    required: false,
  })
  @IsOptional()
  @IsString()
  dosage?: string;

  @ApiProperty({
    description: 'Duración del tratamiento',
    example: '30 días',
    required: false,
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({
    description: 'Estado del tratamiento',
    enum: ['actual', 'previo'],
    example: 'actual',
    required: false,
  })
  @IsOptional()
  @IsEnum(['actual', 'previo'])
  status?: string;

  @ApiProperty({
    description: 'ID del médico que prescribió',
    example: 'dr-uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  prescribedBy?: string;

  @ApiProperty({
    description: 'Fecha de prescripción',
    example: '2024-01-15T10:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  prescribedAt?: string;

  @ApiProperty({
    description: 'Notas adicionales',
    example: 'Tomar con alimentos',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Si el tratamiento está activo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class AddBatchTreatmentsDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'clxxx123',
  })
  @IsString()
  patientId: string;

  @ApiProperty({
    description: 'Lista de medicamentos/tratamientos a agregar',
    type: [TreatmentItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TreatmentItemDto)
  medications: TreatmentItemDto[];
}
