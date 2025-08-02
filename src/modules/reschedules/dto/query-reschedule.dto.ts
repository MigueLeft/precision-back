import { IsOptional, IsString, IsIn, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryRescheduleDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Buscar por ID de cita',
    example: 'appointmentId123',
  })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por estado de reprogramación',
    enum: ['pending', 'completed'],
    example: 'pending',
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'completed'])
  rescheduleStatus?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por quien solicitó',
    enum: ['PATIENT', 'MEDIC', 'SYSTEM'],
    example: 'PATIENT',
  })
  @IsOptional()
  @IsString()
  @IsIn(['PATIENT', 'MEDIC', 'SYSTEM'])
  requestedBy?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por razón de reprogramación',
    enum: ['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other'],
    example: 'patient_request',
  })
  @IsOptional()
  @IsString()
  @IsIn(['patient_request', 'medic_unavailable', 'emergency', 'system_error', 'other'])
  rescheduleReason?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar',
    example: 'createdAt',
    enum: ['createdAt', 'originalDateTime', 'newDateTime', 'status', 'priority'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'originalDateTime', 'newDateTime', 'status', 'priority'])
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Orden de la consulta',
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}