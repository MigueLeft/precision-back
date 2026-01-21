import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUuidId } from '../../../common/decorators/id-validation.decorator';

class AntecedentItemDto {
  @ApiProperty({
    description: 'ID del antecedente',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUuidId()
  antecedentId: string;

  @ApiProperty({
    description: 'Si el paciente tiene esta condición',
    example: true,
  })
  @IsBoolean()
  hasCondition: boolean;

  @ApiProperty({
    description: 'Fecha de diagnóstico (si aplica)',
    example: '2020-01-15T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  diagnosedAt?: string;

  @ApiProperty({
    description: 'Notas adicionales (puede incluir relación familiar si aplica)',
    example: 'Diagnosticado hace 5 años. Padre con hipertensión',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddBatchPatientAntecedentsDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'clxxx123',
  })
  @IsString()
  patientId: string;

  @ApiProperty({
    description: 'Lista de antecedentes a agregar al paciente',
    type: [AntecedentItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AntecedentItemDto)
  antecedents: AntecedentItemDto[];
}
