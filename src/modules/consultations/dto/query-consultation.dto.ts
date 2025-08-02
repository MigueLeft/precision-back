import { IsOptional, IsString, IsDateString, IsBoolean, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryConsultationDto {
  @ApiPropertyOptional({
    description: 'Página para la paginación',
    example: 1,
    minimum: 1
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 10,
    minimum: 1
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'ID de la cita para filtrar consultas',
    example: 'clm123abc456def'
  })
  @IsString()
  @IsOptional()
  appointmentId?: string;

  @ApiPropertyOptional({
    description: 'ID del usuario que registró la consulta',
    example: 'clm789xyz123abc'
  })
  @IsString()
  @IsOptional()
  registeredByUserId?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio para filtrar consultas (ISO 8601)',
    example: '2024-01-01T00:00:00Z'
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin para filtrar consultas (ISO 8601)',
    example: '2024-12-31T23:59:59Z'
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por consultas activas o inactivas',
    example: true
  })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Buscar en anamnesis, tratamiento indicado o notas médicas',
    example: 'dolor abdominal'
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    example: 'realizationDateTime',
    enum: ['realizationDateTime', 'clinicalRegistrationDate', 'createdAt']
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'realizationDateTime';

  @ApiPropertyOptional({
    description: 'Orden de los resultados',
    example: 'desc',
    enum: ['asc', 'desc']
  })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}