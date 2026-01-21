import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateExamCatalogDto {
  @ApiProperty({ description: 'Categoría del examen', example: 'HEMATOLOGÍA' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Nombre del examen', example: 'Hemoglobina' })
  @IsString()
  examName: string;

  @ApiPropertyOptional({
    description: 'Unidad de medida',
    example: 'g/dL',
  })
  @IsOptional()
  @IsString()
  measurementUnit?: string;

  @ApiPropertyOptional({
    description: 'Valor mínimo de referencia',
    example: 12.0,
  })
  @IsOptional()
  @IsNumber()
  referenceMin?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo de referencia',
    example: 16.0,
  })
  @IsOptional()
  @IsNumber()
  referenceMax?: number;

  @ApiProperty({
    description: 'Tipo de dato',
    enum: ['numerico', 'texto', 'boolean'],
    example: 'numerico',
  })
  @IsEnum(['numerico', 'texto', 'boolean'])
  dataType: string;

  @ApiPropertyOptional({
    description: 'Descripción del examen',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Rango normal en texto',
    example: '12-16 g/dL',
  })
  @IsOptional()
  @IsString()
  normalRange?: string;
}
