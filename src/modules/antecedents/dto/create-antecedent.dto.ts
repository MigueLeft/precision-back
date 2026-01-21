import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateAntecedentDto {
  @ApiProperty({
    description: 'Nombre del antecedente',
    example: 'Diabetes tipo 2',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'Valor único para identificar el antecedente (usado para búsquedas)',
    example: 'diabetes_tipo_2',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    description: 'Descripción del antecedente',
    example: 'Diabetes mellitus tipo 2 diagnosticada hace 5 años',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID del tipo de antecedente',
    example: 'uuid-del-tipo-antecedente',
  })
  @IsUUID()
  @IsNotEmpty()
  antecedentTypeId: string;

  @ApiProperty({
    description: 'Estado activo del antecedente',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
