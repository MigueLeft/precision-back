import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsJSON } from 'class-validator';

export class UpdateClinicalInfoDto {
  @ApiProperty({
    description: 'Current illness - detailed clinical description',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentIllness?: string;

  @ApiProperty({
    description: 'Diagnostic plan - list of diagnostic procedures and follow-up',
    required: false,
  })
  @IsString()
  @IsOptional()
  diagnosticPlan?: string;

  @ApiProperty({
    description: 'Treatment plan - therapeutic plan for the patient',
    required: false,
  })
  @IsString()
  @IsOptional()
  treatmentPlan?: string;

  @ApiProperty({
    description: 'Patient problems as JSON { actuales: string[], previos: string[] }',
    required: false,
  })
  @IsObject()
  @IsOptional()
  problems?: { actuales: string[]; previos: string[] };

  @ApiProperty({
    description: 'Evolución clínica del paciente en formato JSON',
    required: false,
  })
  @IsObject()
  @IsOptional()
  evolucion?: Record<string, any>;

  @ApiProperty({
    description: 'ID of the physician updating clinical information',
    example: 'clxxx987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastClinicalUpdateBy?: string;
}
