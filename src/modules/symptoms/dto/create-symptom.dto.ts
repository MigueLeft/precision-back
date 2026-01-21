import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateSymptomDto {
  @ApiProperty({
    description: 'Nombre del síntoma',
    example: 'Dolor de cabeza',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'Valor único para identificar el síntoma (usado para búsquedas)',
    example: 'dolor_cabeza',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'Descripción del síntoma',
    example: 'Dolor de cabeza frecuente o migrañas',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID de la categoría del síntoma',
    example: 'uuid-de-categoria-sintoma',
  })
  @IsUUID()
  @IsNotEmpty()
  symptomCategoryId: string;

  @ApiProperty({
    description: 'Severidad del síntoma',
    example: 'moderate',
    enum: ['mild', 'moderate', 'severe'],
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsIn(['mild', 'moderate', 'severe'])
  severity?: string;

  @ApiProperty({
    description: 'Estado activo del síntoma',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
