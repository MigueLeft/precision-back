import { IsOptional, IsString, IsInt, Min, IsDateString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAppointmentDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Buscar por razón o notas',
    example: 'Consulta general',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Fecha específica para filtrar citas (ISO 8601)',
    example: '2023-01-10',
  })
  @IsOptional()
  @IsDateString()
  specificDate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio para filtrar citas (ISO 8601)',
    example: '2023-01-10',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin para filtrar citas (ISO 8601)',
    example: '2023-02-10',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Hora específica para filtrar citas (ejemplo: "15:00")',
    example: '15:00',
  })
  @IsOptional()
  @IsString()
  specificTime?: string;

  @ApiPropertyOptional({
    description: 'Estado de la cita',
    example: 'scheduled',
    enum: ['pending', 'scheduled', 'completed', 'canceled', 'no_show'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'scheduled', 'completed', 'canceled', 'no_show'])
  appointmentStatus?: string;

  @ApiPropertyOptional({
    description: 'ID del paciente para filtrar citas',
    example: 'cluid123',
  })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiPropertyOptional({
    description: 'ID del médico para filtrar citas',
    example: 'cluid123',
  })
  @IsOptional()
  @IsString()
  medicId?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar',
    example: 'dateTime',
    enum: ['dateTime', 'reason', 'appointmentStatus', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['dateTime', 'reason', 'appointmentStatus', 'createdAt', 'updatedAt'])
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Orden de la consulta',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}