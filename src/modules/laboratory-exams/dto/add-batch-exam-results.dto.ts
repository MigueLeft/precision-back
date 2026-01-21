import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

class ExamResultItemDto {
  @ApiProperty({
    description: 'ID del examen del catálogo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUuidId()
  examId: string;

  @ApiProperty({
    description: 'Valor numérico del resultado',
    example: 14.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  numericValue?: number;

  @ApiProperty({
    description: 'Valor de texto del resultado',
    example: 'Negativo',
    required: false,
  })
  @IsOptional()
  @IsString()
  textValue?: string;

  @ApiProperty({
    description: 'Fecha del resultado',
    example: '2024-01-15T10:00:00Z',
  })
  @IsDateString()
  resultDate: string;

  @ApiProperty({
    description: 'Si el resultado es anormal',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isAbnormal?: boolean;

  @ApiProperty({
    description: 'Observaciones sobre el resultado',
    example: 'Valores normales',
    required: false,
  })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({
    description: 'ID del médico que ordenó el examen',
    example: 'dr-uuid',
    required: false,
  })
  @IsOptional()
  @IsString()
  orderedBy?: string;

  @ApiProperty({
    description: 'ID del estudio médico al que pertenece',
    example: 'study-uuid',
    required: false,
  })
  @IsOptional()
  @IsUuidId()
  medicalStudyId?: string;
}

export class AddBatchExamResultsDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'clxxx123',
  })
  @IsString()
  patientId: string;

  @ApiProperty({
    description: 'Lista de resultados de exámenes a agregar',
    type: [ExamResultItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExamResultItemDto)
  results: ExamResultItemDto[];
}
