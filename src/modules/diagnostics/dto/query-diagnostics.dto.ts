import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDiagnosticsDto {
  @ApiProperty({
    description: 'Número de página',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({
    description: 'Número de elementos por página',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiProperty({
    description: 'Buscar por nombre de diagnóstico o grupo',
    example: 'nutricion',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filtrar por grupo diagnóstico específico',
    example: 'uuid-del-grupo',
    required: false,
  })
  @IsOptional()
  @IsString()
  diagnosticGroupId?: string;

  @ApiProperty({
    description: 'Fecha desde (ISO string)',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiProperty({
    description: 'Fecha hasta (ISO string)',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiProperty({
    description: 'Ordenar por campo',
    example: 'diagnosedAt',
    enum: ['diagnosedAt', 'percentage', 'obtainedScore'],
    required: false,
    default: 'diagnosedAt',
  })
  @IsOptional()
  @IsString()
  @IsIn(['diagnosedAt', 'percentage', 'obtainedScore'])
  sortBy?: string = 'diagnosedAt';

  @ApiProperty({
    description: 'Orden de clasificación',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false,
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
