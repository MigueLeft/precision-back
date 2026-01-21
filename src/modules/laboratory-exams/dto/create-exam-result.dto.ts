import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
  ValidateIf,
} from 'class-validator';

export class CreateExamResultDto {
  @ApiProperty({ description: 'ID del paciente' })
  @IsString()
  patientId: string;

  @ApiProperty({ description: 'ID del examen del catálogo' })
  @IsString()
  examId: string;

  @ApiPropertyOptional({ description: 'ID del estudio médico asociado' })
  @IsOptional()
  @IsString()
  medicalStudyId?: string;

  @ApiPropertyOptional({
    description: 'Valor numérico (para exámenes numéricos)',
    example: 14.5,
  })
  @ValidateIf((o) => o.numericValue !== undefined)
  @IsNumber()
  numericValue?: number;

  @ApiPropertyOptional({
    description: 'Valor de texto (para exámenes de texto)',
    example: 'Normales',
  })
  @ValidateIf((o) => o.textValue !== undefined)
  @IsString()
  textValue?: string;

  @ApiPropertyOptional({
    description: 'Valor booleano (para exámenes booleanos)',
    example: false,
  })
  @ValidateIf((o) => o.booleanValue !== undefined)
  @IsBoolean()
  booleanValue?: boolean;

  @ApiProperty({ description: 'Fecha del resultado' })
  @IsDateString()
  resultDate: string;

  @ApiPropertyOptional({ description: 'Observaciones sobre el resultado' })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiPropertyOptional({ description: 'ID del médico que ordenó el examen' })
  @IsOptional()
  @IsString()
  orderedBy?: string;

  @ApiPropertyOptional({ description: 'ID del médico que interpretó' })
  @IsOptional()
  @IsString()
  interpretedBy?: string;
}
