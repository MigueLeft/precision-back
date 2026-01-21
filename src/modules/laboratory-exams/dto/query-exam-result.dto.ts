import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryExamResultDto {
  @ApiPropertyOptional({ description: 'Número de página', example: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Límite por página', example: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Filtrar por paciente' })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por examen' })
  @IsOptional()
  @IsString()
  examId?: string;

  @ApiPropertyOptional({ description: 'Filtrar por estudio médico' })
  @IsOptional()
  @IsString()
  medicalStudyId?: string;

  @ApiPropertyOptional({ description: 'Fecha inicial (ISO)' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Fecha final (ISO)' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Filtrar solo resultados anormales',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isAbnormal?: boolean;

  @ApiPropertyOptional({ description: 'Mostrar solo activos', example: true })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  active?: boolean = true;
}
