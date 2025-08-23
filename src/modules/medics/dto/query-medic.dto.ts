import { IsOptional, IsString, IsInt, Min, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryMedicDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    minimum: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    example: 10,
    minimum: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Buscar por nombre, apellido, identificación, email o número de registro',
    example: 'Juan'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo',
    example: true
  })
  @IsOptional()
  // @Transform(({ value }) => {
  //   if (value === 'true' || value === true) return true;
  //   if (value === 'false' || value === false) return false;
  //   return undefined;
  // })
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Filtrar por especialidad',
    example: 'Cardiología'
  })
  @IsOptional()
  @IsString()
  specialty?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
    example: 'name',
    enum: ['name', 'lastName', 'email', 'registrationNumber', 'createdAt']
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'name';

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    example: 'asc',
    enum: ['asc', 'desc']
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';
}