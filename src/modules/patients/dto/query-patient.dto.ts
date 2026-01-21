import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPatientDto {
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
    description: 'Buscar por nombre, apellido, identificación o email',
    example: 'Juan',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({
    description:
      'Fecha de nacimiento exacta (ISO 8601). Si se proporciona, se ignoran birthdateFrom y birthdateTo',
    example: '1990-05-15',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento desde (ISO 8601)',
    example: '1980-01-01',
  })
  @IsOptional()
  @IsDateString()
  birthdateFrom?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento hasta (ISO 8601)',
    example: '2000-12-31',
  })
  @IsOptional()
  @IsDateString()
  birthdateTo?: string;

  @ApiPropertyOptional({
    description: 'Género del paciente',
    example: 'Masculino',
    enum: ['Masculino', 'Femenino'],
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
    example: 'firstName',
    enum: ['firstName', 'lastName', 'email', 'birthdate', 'createdAt'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'firstName';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';
}
