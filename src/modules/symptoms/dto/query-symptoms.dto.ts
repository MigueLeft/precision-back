import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
  IsIn,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QuerySymptomsDto {
  @ApiProperty({
    description: 'Número de página',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    description: 'Número de elementos por página',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({
    description: 'Término de búsqueda (busca en nombre, valor y descripción)',
    example: 'dolor',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filtrar por categoría de síntoma',
    example: 'uuid-de-categoria',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  symptomCategoryId?: string;

  @ApiProperty({
    description: 'Filtrar por severidad',
    example: 'moderate',
    enum: ['mild', 'moderate', 'severe'],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['mild', 'moderate', 'severe'])
  severity?: string;

  @ApiProperty({
    description: 'Filtrar por estado activo',
    example: true,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Campo por el cual ordenar',
    example: 'name',
    default: 'name',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['name', 'value', 'severity', 'createdAt'])
  sortBy?: string = 'name';

  @ApiProperty({
    description: 'Dirección del ordenamiento',
    example: 'asc',
    enum: ['asc', 'desc'],
    default: 'asc',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}
