import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class AssignPatientAntecedentDto {
  @ApiProperty({
    description: 'ID del paciente',
    example: 'uuid-del-paciente',
  })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({
    description: 'ID del antecedente',
    example: 'uuid-del-antecedente',
  })
  @IsUUID()
  @IsNotEmpty()
  antecedentId: string;

  @ApiProperty({
    description: 'Si el paciente tiene esta condición',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  hasCondition?: boolean;

  @ApiProperty({
    description: 'Notas adicionales sobre el antecedente del paciente',
    example: 'Diagnosticado en 2020, controlado con medicación',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Fecha de diagnóstico',
    example: '2020-01-15T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  diagnosedAt?: string;
}
